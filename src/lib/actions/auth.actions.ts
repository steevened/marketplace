"use server";

import { and, eq, gt, desc } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { z } from "zod";
import { db } from "../db";
// import { VerificationToken } from "../db/schema";
import { getCurrentOtp } from "@/app/(auth)/data";
import { getVisitorSession } from "../data/auth.data";
import { users, verificationTokens, visitors } from "../db/schemas";
import { EmailSchemaField } from "../schemas/auth.schemas";
import { FormState } from "../types";
import { serverToast } from "./config.actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession } from "../session";
// import { SignInSchema } from "../schemas/auth.schemas";
// import { createSession, deleteSession } from "../session";
// import { FormState } from "../types";
// import { EmailSchemaField } from "@/app/(auth)/schemas";

// export async function signIn(
//   state: FormState,
//   formData: FormData
// ): Promise<FormState> {
//   const validatedFields = SignInSchema.safeParse({
//     email: formData.get("email"),
//     password: formData.get("password"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   const { email, password } = validatedFields.data;

//   const [user] = await db.select().from(users).where(eq(users.email, email));

//   if (!user) {
//     return {
//       message: "Invalid email or password",
//     };
//   }

//   // const matchesPassword = await bcrypt.compare(password, user.passwordHash);

//   // if (!matchesPassword) {
//   //   return {
//   //     message: "Invalid email or password",
//   //   };
//   // }

//   await createSession(user.id);

//   revalidatePath("/");

//   return {
//     success: true,
//   };
// }

// export async function signInWithRedirect(
//   state: FormState,
//   formData: FormData
// ): Promise<FormState> {
//   const result = await signIn(state, formData);

//   const redirectParam = formData.get("redirect") as string;

//   if (result?.success) {
//     redirect(redirectParam || "/");
//   }

//   return result;
// }

// export async function signOut() {
//   await deleteSession();
//   revalidatePath("/");
// }

export async function SignInVerificationEmail(
  state: FormState,
  formData: FormData
) {
  const EmailSchema = z.object({
    email: EmailSchemaField,
  });
  const validatedFields = EmailSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formData,
    };
  }

  const { email } = validatedFields.data;

  const [user] = await db
    .select({ userId: users.id, email: users.email })
    .from(users)
    .where(eq(users.email, email));

  if (!user) {
    // TODO: SEND EMAIL
  }

  await insertOtpToken(email);

  revalidatePath("/sign-in");

  return {
    success: true,
  };
}


export async function sendEmailVerificationToken(
  state: FormState,
  formData: FormData
) {
  const EmailSchema = z.object({
    email: EmailSchemaField,
  });
  const validatedFields = EmailSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formData,
    };
  }

  const { email } = validatedFields.data;

  const [user] = await db
    .select({ userId: users.id, email: users.email })
    .from(users)
    .where(eq(users.email, email));

  if (!user) {
    await createAuthSession(email);
    return {
      success: true,
    };
  }

  const [currentOtp] = await db
    .select()
    .from(verificationTokens)
    .where(
      and(
        eq(verificationTokens.identifier, email),
        gt(verificationTokens.expires, new Date())
      )
    );

  if (currentOtp) {
    await createAuthSession(email);
    return {
      message: "Ya se ha enviado un código OTP a tu email",
      success: false,
    };
  }

  await insertOtpToken(email);

  await createAuthSession(email);

  return {
    success: true,
  };
}

export async function verifySignInOTP(state: FormState, formData: FormData) {
  const visitorSession = await getVisitorSession();

  if (!visitorSession || !visitorSession.visitorId) {
    serverToast.error(
      "El código OTP ha sido usado o expirado, por favor vuelva a intentarlo nuevamente."
    );
    revalidatePath("/sign-in");
    return {
      success: false,
    };
  }

  const validatedFields = z
    .object({
      otp: z.coerce.string().length(6, {
        message: "El código OTP debe tener 6 dígitos",
      }),
    })
    .safeParse({
      email: visitorSession.identifier,
      otp: formData.get("otp"),
    });

  if (!validatedFields.success) {
    for (const error in validatedFields.error.errors) {
      serverToast.error(validatedFields.error.errors[error].message);
    }
    return {
      success: false,
    };
  }

  const [user] = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.email, visitorSession.identifier));

  if (!user) {
    serverToast.error(
      "El código OTP ha sido usado o expirado, por favor vuelva a intentarlo nuevamente."
    );
    return {
      suceess: false,
    };
  }

  const { otp } = validatedFields.data;

  const [existingToken] = await db
    .select()
    .from(verificationTokens)
    .where(
      and(
        eq(verificationTokens.identifier, user.email),
        eq(verificationTokens.token, otp)
      )
    )
    .orderBy(desc(verificationTokens.expires));

  if (!existingToken) {
    serverToast.error("Código OTP inválido");
    return {
      success: false,
    };
  }

  const activeToken = await getCurrentOtp(user.email);

  if (!activeToken) {
    serverToast.error(
      "El código OTP ha expirado, por favor solicita uno nuevo"
    );
    return {
      success: false,
    };
  }

  await deleteActiveOtp(user.email);

  await createSession(user.id);

  const redirectParam = formData.get("redirect") as string;

  redirect(redirectParam || "/");


  return {
    success: true,
  };
}

// export async function verifyEmailToken(
//   state: FormState,
//   formData: FormData
// ): Promise<FormState> {
//   const authSession = await getAuthSession();

//   if (!authSession) {
//     return {
//       message: "El código OTP ha expirado, por favor solicita uno nuevo",
//       success: false,
//       errors: {
//         otpExpired: "true",
//       },
//     };
//   }

//   const validatedFields = z
//     .object({
//       email: EmailSchemaField,
//       otp: z.coerce.string().length(6, {
//         message: "El código OTP debe tener 6 dígitos",
//       }),
//     })
//     .safeParse({
//       email: authSession,
//       otp: formData.get("otp"),
//     });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   const { email, otp } = validatedFields.data;

//   const [existingToken] = await db
//     .select()
//     .from(verificationTokens)
//     .where(
//       and(
//         eq(verificationTokens.identifier, email),
//         eq(verificationTokens.token, otp)
//       )
//     );

//   if (!existingToken) {
//     return {
//       message: "Código OTP inválido",
//     };
//   }

//   const activeToken = await getActiveOtp(authSession);

//   if (!activeToken) {
//     return {
//       message:
//         "El código OTP ingresado ha expirado, por favor solicita un nuevo código.",
//       success: false,
//       errors: {
//         otpExpired: "true",
//       },
//     };
//   }

//   if (existingToken.token !== activeToken.token) {
//     return {
//       message:
//         "El código OTP ingresado ha expirado, ingresa el código más reciente enviado a tu email.",
//       success: false,
//     };
//   }

//   // const [userUpdated] = await db
//   //   .update(users)
//   //   .set({ emailVerified: new Date() })
//   //   .where(eq(users.email, email))
//   //   .returning({
//   //     userId: users.id,
//   //   });

//   const [userFounded] = await db
//     .select({ userId: users.id })
//     .from(users)
//     .where(eq(users.email, email));

//   await createSession(userFounded.userId);

//   const redirectParam = formData.get("redirect") as string;

//   resetAuthProcess();
//   deleteActiveOtp(email);

//   redirect(redirectParam || "/");
// }

export async function resetSignInProcess() {
  const visitorSession = await getVisitorSession();
  if (!visitorSession) revalidatePath("/sign-in");
  const cookieStore = await cookies();
  cookieStore.delete("visitor-id");
  await createOrUpdateVisitor();
  revalidatePath("/sign-in");
  // await db.delete(verificationTokens).where(eq())
}

// export async function resendEmailToken(state: FormState) {
//   const authSession = await getAuthSession();

//   if (!authSession) {
//     return {
//       message: "No se ha encontrado un email para enviar el código OTP",
//       success: false,
//       errors: {
//         otpExpired: "true",
//       },
//     };
//   }

//   const activeOtp = await getActiveOtp(authSession);

//   if (activeOtp) {
//     return {
//       message:
//         "El código OTP ya ha sido enviado a tu email, por favor revisa tu bandeja de entrada.",
//       success: false,
//     };
//   }

//   await insertOtpToken(authSession);

//   return {
//     success: true,
//   };
// }

function generateNumericOtp(length: number): string {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
}

// async function createAuthSession(email: string) {
//   const cookieStore = await cookies();

//   cookieStore.set("auth-session", email, {
//     // expires: new Date(Date.now() + 60 * 10 * 1000),
//   });
// }

// export async function getAuthSession(): Promise<string | undefined> {
//   const cookieStore = await cookies();
//   const email = cookieStore.get("auth-session")?.value;
//   return email;
// }

// async function getActiveOtp(
//   email: string
// ): Promise<VerificationToken | undefined> {
//   const [activeOtp] = await db
//     .select()
//     .from(verificationTokens)
//     .where(
//       and(
//         eq(verificationTokens.identifier, email),
//         gt(verificationTokens.expires, new Date())
//       )
//     );

//   return activeOtp || undefined;
// }

export async function deleteActiveOtp(email: string) {
  const activeOtp = await getCurrentOtp(email);
  if (!activeOtp) return;
  await db
    .delete(verificationTokens)
    .where(
      and(
        eq(verificationTokens.identifier, email),
        eq(verificationTokens.token, activeOtp.token)
      )
    );
}

export async function insertOtpToken(email: string) {
  const token = generateNumericOtp(6);
  const cookieStore = await cookies();
  const visitorId = cookieStore.get("visitor-id")?.value;

  await db.insert(verificationTokens).values({
    expires: new Date(Date.now() + 60 * 5 * 1000),
    token,
    identifier: email,
    visitorId: Number(visitorId),
  });
}
async function createAuthSession(email: string) {
  await serverToast.warning("Not implemented");
}

export async function createSignInSession(email: string) {
  return await createAuthSession(email);
}

export async function createOrUpdateVisitor() {
  const cookieStore = await cookies();
  const visitorId = cookieStore.get("visitor-id")?.value;
  const headersList = await headers();
  const userAgent = headersList.get("user-agent");

  let visitor: { id: number } | null;

  if (!visitorId) {
    const [visitorCreated] = await db
      .insert(visitors)
      .values({
        userAgent,
      })
      .returning({ id: visitors.id });
    visitor = visitorCreated;
    cookieStore.set("visitor-id", visitorCreated.id.toString());
  } else {
    const [visitorUpdated] = await db
      .update(visitors)
      .set({ userAgent, joinedAt: new Date() })
      .where(eq(visitors.id, Number(visitorId)))
      .returning({ id: visitors.id });

    visitor = visitorUpdated;
  }

  return visitor;
}

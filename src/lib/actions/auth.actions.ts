"use server";

import { and, eq, gt } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "../db";
// import { VerificationToken } from "../db/schema";
import { users, verificationTokens } from "../db/schemas";
import { getCurrentOtp } from "@/app/(auth)/data";
import { FormState } from "../types";
import { EmailSchemaField } from "../schemas/auth.schemas";
import { serverToast } from "./config.actions";
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

// export async function resetAuthProcess() {
//   const cookieStore = await cookies();
//   cookieStore.delete("auth-session");
// }

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

  await db.insert(verificationTokens).values({
    expires: new Date(Date.now() + 60 * 5 * 1000),
    token,
    identifier: email,
  });
}
async function createAuthSession(email: string) {
  await serverToast.warning("Not implemented");
}

export async function createSignInSession(email: string) {
  return await createAuthSession(email);
}

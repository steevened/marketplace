"use server";

import bcrypt from "bcrypt";
import { and, eq, gt, lt } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "../db";
import { users, verificationTokens } from "../db/schema";
import { EmailSchemaField, SignInSchema } from "../schemas/auth.schemas";
import { createSession, deleteSession } from "../session";
import { FormState } from "../types";

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return {
      message: "Invalid email or password",
    };
  }

  const matchesPassword = await bcrypt.compare(password, user.passwordHash);

  if (!matchesPassword) {
    return {
      message: "Invalid email or password",
    };
  }

  await createSession(user.id);

  revalidatePath("/");

  return {
    success: true,
  };
}

export async function signInWithRedirect(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const result = await signIn(state, formData);

  const redirectParam = formData.get("redirect") as string;

  if (result?.success) {
    redirect(redirectParam || "/");
  }

  return result;
}

export async function signOut() {
  await deleteSession();
  revalidatePath("/");
}

const EmailSchema = z.object({
  email: EmailSchemaField,
});

export async function sendEmailVerificationToken(
  state: FormState,
  formData: FormData
) {
  const validatedFields = EmailSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
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

  const token = generateNumericOtp(6);

  await db.insert(verificationTokens).values({
    expires: new Date(Date.now() + 60 * 5 * 1000),
    token,
    identifier: user.email,
  });

  await createAuthSession(email);

  return {
    success: true,
  };
}

export async function verifyEmailToken(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // const cookieStore = await cookies();
  // const emailToVerify = cookieStore.get("verify-email")?.value;

  const authSession = await getAuthSession();

  if (!authSession) {
    return {
      message: "El código OTP ha expirado, por favor solicita uno nuevo",
      success: false,
      errors: {
        otpExpired: "true",
      },
    };
  }

  const validatedFields = z
    .object({
      email: EmailSchemaField,
      otp: z.coerce.string().length(6, {
        message: "El código OTP debe tener 6 dígitos",
      }),
    })
    .safeParse({
      email: authSession,
      otp: formData.get("otp"),
    });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, otp } = validatedFields.data;

  const [existingToken] = await db
    .select()
    .from(verificationTokens)
    .where(
      and(
        eq(verificationTokens.identifier, email),
        eq(verificationTokens.token, otp)
      )
    );

  if (!existingToken) {
    return {
      message: "Código OTP inválido",
    };
  }

  if (existingToken.expires < new Date(Date.now())) {
    return {
      message:
        "El código OTP ingresado ha expirado, ingresa el nuevo código enviado a tu email.",
      success: false,
      errors: {
        otpExpired: "true",
      },
    };
  }

  // const [userUpdated] = await db
  //   .update(users)
  //   .set({ emailVerified: new Date() })
  //   .where(eq(users.email, email))
  //   .returning({
  //     userId: users.id,
  //   });

  const [userFounded] = await db
    .select({ userId: users.id })
    .from(users)
    .where(eq(users.email, email));

  await createSession(userFounded.userId);

  const redirectParam = formData.get("redirect") as string;

  redirect(redirectParam || "/");
}

export async function resetAuthProcess() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-session");
}

export async function resendEmailToken(state: FormState) {
  const cookieStore = await cookies();
  const emailToVerify = cookieStore.get("verify-email")?.value;

  if (!emailToVerify) {
    return {
      message: "No se ha encontrado un email para enviar el código OTP",
    };
  }

  const [currentOtp] = await db
    .select()
    .from(verificationTokens)
    .where(
      and(
        eq(verificationTokens.identifier, emailToVerify),
        gt(verificationTokens.expires, new Date())
      )
    );

  if (currentOtp) {
    return {
      message:
        "El código OTP ya ha sido enviado a tu email, por favor revisa tu bandeja de entrada.",
    };
  }

  const token = generateNumericOtp(6);

  await db.insert(verificationTokens).values({
    expires: new Date(Date.now() + 60 * 5 * 1000),
    token,
    identifier: emailToVerify,
  });

  return {
    success: true,
  };
}

const generateNumericOtp = (length: number): string => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
};

async function createAuthSession(email: string) {
  const cookieStore = await cookies();

  cookieStore.set("auth-session", email, {
    // expires: new Date(Date.now() + 60 * 10 * 1000),
  });
}

export async function getAuthSession(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const email = cookieStore.get("auth-session")?.value;
  cookieStore.get("auth-session");
  return email;
}

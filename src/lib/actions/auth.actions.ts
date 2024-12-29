"use server";

import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
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

  const cookieStore = await cookies();

  cookieStore.set("verify-email", email, {
    maxAge: 60 * 5 * 1000,
  });

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return {
      success: true,
    };
  }

  const token = generateNumericOtp(6);

  await db.insert(verificationTokens).values({
    expires: new Date(Date.now() + 60 * 5 * 1000),
    token,
    identifier: user.email,
  });

  return {
    success: true,
  };
}

export async function verifyEmailToken(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const cookieStore = await cookies();
  const emailToVerify = cookieStore.get("verify-email")?.value;

  if (!emailToVerify) {
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
        message: "El código OTP debe ser de 6 dígitos",
      }),
    })
    .safeParse({
      email: emailToVerify,
      otp: formData.get("otp"),
    });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, otp } = validatedFields.data;

  if (otp !== "123456") {
    return {
      message: "El código OTP es incorrecto",
      success: false,
    };
  }

  // const { email, token } = validatedFields.data;

  // const [user] = await db.select().from(users).where(eq(users.email, email));

  // if (!user) {
  //   return {
  //     message: "Invalid email or token",
  //   };
  // }

  // if (user.emailVerificationToken !== token) {
  //   return {
  //     message: "Invalid email or token",
  //   };
  // }

  // await db.update(users).set({ emailVerified: true }).where(eq(users.id, user.id));

  // cookieStore.delete("verify-email");

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

"use server";

import { z } from "zod";
import { FormState } from "../types";
import { EmailSchemaField } from "@/app/(auth)/schemas";
import { db } from "@/lib/db";
import { users, verificationTokens } from "@/lib/db/schemas";
import { and, eq } from "drizzle-orm";
import { getCurrentOtp } from "@/lib/data/auth.data";
import { deleteActiveOtp, insertOtpToken } from "./auth.actions";
import { cookies } from "next/headers";
import { createLoginSession } from "./sign-in.actions";
import { redirect } from "next/navigation";
import { getRegisterSession } from "@/app/(auth)/data";
import { createSession } from "@/lib/session";

const expiredOtpMessage = {
  message:
    "El código OTP ingresado ha expirado, por favor solicita un nuevo código.",
  success: false,
  errors: {
    otpExpired: "true",
  },
};

export async function registerEmail(
  state: FormState,
  formData: FormData
): Promise<FormState<unknown>> {
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

  if (user) {
    const currentOtp = await getCurrentOtp(email);
    if (!currentOtp) {
      await insertOtpToken(email);
      await createLoginSession(user.email);
    }
    redirect("/sign-in");
  }

  await db.insert(users).values({
    email: email,
    createdAt: new Date(),
  });

  await createRegisterSession(email);
  await insertOtpToken(email);

  return {
    success: true,
  };
}

async function createRegisterSession(email: string) {
  const cookieStore = await cookies();

  cookieStore.set("register-session", email, {});
}

export async function verifyRegisterEmail(
  state: FormState,
  formData: FormData
): Promise<FormState<unknown>> {
  const registerSession = await getRegisterSession();

  if (!registerSession) {
    return expiredOtpMessage;
  }

  const validatedFields = z
    .object({
      email: EmailSchemaField,
      otp: z.coerce.string().length(6, {
        message: "El código OTP debe tener 6 dígitos",
      }),
    })
    .safeParse({
      email: registerSession,
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

  const activeToken = await getCurrentOtp(registerSession);

  if (!activeToken) {
    return expiredOtpMessage;
  }

  if (existingToken.token !== activeToken.token) {
    return {
      message:
        "El código OTP ingresado ha expirado, ingresa el código más reciente enviado a tu email.",
      success: false,
    };
  }

  const [userUpdated] = await db
    .update(users)
    .set({ emailVerified: new Date(), updatedAt: new Date() })
    .where(eq(users.email, email))
    .returning({
      userId: users.id,
    });

  await createSession(userUpdated.userId);

  const redirectParam = formData.get("redirect") as string;

  resetRegisterProcess();
  deleteActiveOtp(email);

  redirect(redirectParam || "/");
}

export async function resetRegisterProcess() {
  const cookieStore = await cookies();
  cookieStore.delete("register-session");
}

"use server";

import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "../db";
import { users } from "../db/schema";
import { SignInSchema } from "../schemas/auth.schemas";
import { createSession, deleteSession } from "../session";
import { FormState } from "../types";
import { redirect } from "next/navigation";

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
    redirect("/" + "?" + redirectParam);
  }

  return result;
}

export async function signOut() {
  await deleteSession();
  revalidatePath("/");
}

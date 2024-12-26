"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { SignupFormSchema } from "./schemas";
import { createSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FormState } from "@/lib/types";

export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  const data = await db
    .select({ email: users.email, id: users.id })
    .from(users)
    .where(eq(users.email, email));

  if (data.length) {
    return {
      message: `User already exists`,
    };
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(users)
    .values({
      name,
      email,
      passwordHash,
    })
    .returning({ id: users.id });

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  await createSession(user.id);

  revalidatePath("/");

  return {
    success: true,
  };
}

export async function signUpWithRedirect(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const result = await signup(state, formData);

  console.log(result);

  if (result?.success) {
    redirect("/");
  }

  return result;
}

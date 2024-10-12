"use server";

import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { users } from "../db/schema";
import { SignInSchema } from "../schemas/auth.schemas";
import { createSession } from "../session";

type FormState =
  | {
      errors?: {
        password?: string[];
        email?: string[];
      };
      message?: string;
    }
  | undefined;

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
}

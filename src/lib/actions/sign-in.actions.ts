import { z } from "zod";
import { FormState } from "../types";
import { EmailSchemaField } from "@/app/(auth)/schemas";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas";
import { eq } from "drizzle-orm";
import { getCurrentOtp } from "@/lib/data/auth.data";
import { insertOtpToken } from "./auth.actions";
import { cookies } from "next/headers";

// export async function registerEmail(
//   state: FormState,
//   formData: FormData
// ): Promise<FormState<unknown>> {
//   const EmailSchema = z.object({
//     email: EmailSchemaField,
//   });
//   const validatedFields = EmailSchema.safeParse({
//     email: formData.get("email"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       formData,
//     };
//   }

//   const { email } = validatedFields.data;

//   const [user] = await db
//     .select({ userId: users.id, email: users.email })
//     .from(users)
//     .where(eq(users.email, email));

//   if (user) {
//     const currentOtp = await getCurrentOtp(email);
//     if (!currentOtp) {
//       await insertOtpToken(email);
//       await createRegisterSession(user.email);
//     }
//     return {
//       success: false,
//       errors: {
//         email: ["User already exists"],
//       },
//     };
//   }
// }

export async function createLoginSession(email: string) {
  const cookieStore = await cookies();

  cookieStore.set("login-session", email, {});
}

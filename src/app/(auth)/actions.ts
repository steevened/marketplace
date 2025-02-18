// "use server";

// import { FormState } from "@/lib/types";
// import { z } from "zod";
// import { EmailSchemaField } from "./schemas";
// import { db } from "@/lib/db";
// import { users, verificationTokens } from "@/lib/db/schemas";
// import { eq } from "drizzle-orm";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { getCurrentOtp } from "./data";

// const EmailSchema = z.object({
//   email: EmailSchemaField,
// });

// export async function registerEmail(
//   state: FormState,
//   formData: FormData
// ): Promise<FormState> {
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
//     }
//     await createAuthSession(user.email);
//     redirect("/sign-in");
//   }

//   await db.insert(users).values({
//     email: email,
//     createdAt: new Date(),
//   });

//   await createRegisterSession(email);

//   return {
//     success: true,
//   };
// }

// async function insertOtpToken(email: string) {
//   const token = generateNumericOtp(6);

//   await db.insert(verificationTokens).values({
//     expires: new Date(Date.now() + 60 * 5 * 1000),
//     token,
//     identifier: email,
//   });
// }

// async function createRegisterSession(email: string) {
//   const cookieStore = await cookies();

//   cookieStore.set("register-session", email, {});
// }

// async function createAuthSession(email: string) {
//   const cookieStore = await cookies();

//   cookieStore.set("auth-session", email, {});
// }

// const generateNumericOtp = (length: number): string => {
//   let otp = "";
//   for (let i = 0; i < length; i++) {
//     otp += Math.floor(Math.random() * 10).toString();
//   }
//   return otp;
// };

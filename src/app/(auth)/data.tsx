import { db } from "@/lib/db";
import { verificationTokens } from "@/lib/db/schemas";
import { and, eq, gt } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getRegisterSession(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const email = cookieStore.get("register-session")?.value;
  return email;
}

export async function getSignInSession(): Promise<{email: string} | null> {
  const cookieStore = await cookies();
  const email = cookieStore.get("auth-session")?.value;
  if(!email) return null
  return {
    email
  }
}


export async function getCurrentOtp(identifier: string) {
  const [currentOtp] = await db
    .select()
    .from(verificationTokens)
    .where(
      and(
        eq(verificationTokens.identifier, identifier),
        gt(verificationTokens.expires, new Date())
      )
    );

  return currentOtp ?? null;
}

import { and, eq, gt } from "drizzle-orm";
import { db } from "../db";
import { verificationTokens } from "../db/schemas";

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

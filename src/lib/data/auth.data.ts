import { and, eq, gt } from "drizzle-orm";
import { cookies } from "next/headers";
import { db } from "../db";
import { verificationTokens } from "../db/schemas";

export const  getVisitorSession = async () => {
  const cookieStore = await cookies();
  const visitorId = cookieStore.get("visitor-id");
  if(!visitorId)return null
  const [tokenProcess] = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.visitorId, Number(visitorId?.value)));
  return tokenProcess;
};

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

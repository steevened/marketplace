import { eq } from "drizzle-orm";
import { db } from "../db";
import { verifySession } from "../session";
// import { unstable_cacheTag as cacheTag } from "next/cache";
import { cache } from "react";
import { users } from "../db/schemas";

export const getUser = cache(async () => {
  // "use cache";
  // cacheTag("session");
  const session = await verifySession();

  if (!session) return null;

  const [user] = await db
    .select({
      name: users.name,
      email: users.email,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, session?.userId));
  return user;
});

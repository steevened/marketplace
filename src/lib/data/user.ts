import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { verifySession } from "../session";
import { cache } from "react";

export const getUser = cache(async () => {
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

import { db } from "@/lib/db";
import { visitors } from "@/lib/db/schemas";
import { eq } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await createOrUpdateVisitor();
    return NextResponse.json({ message: "ok" });
  } catch (error) {
    console.log("error creating visitor", error);
  }
}

export async function createOrUpdateVisitor() {
  const cookieStore = await cookies();
  const visitorId = cookieStore.get("visitor-id")?.value;
  const headersList = await headers();
  const userAgent = headersList.get("user-agent");

  let visitor: { id: number } | null;

  if (!visitorId) {
    const [visitorCreated] = await db
      .insert(visitors)
      .values({
        userAgent,
      })
      .returning({ id: visitors.id });
    visitor = visitorCreated;
    cookieStore.set("visitor-id", visitorCreated.id.toString());
  } else {
    const [visitorUpdated] = await db
      .update(visitors)
      .set({ userAgent, joinedAt: new Date() })
      .where(eq(visitors.id, Number(visitorId)))
      .returning({ id: visitors.id });

    visitor = visitorUpdated;
  }

  return visitor;
}

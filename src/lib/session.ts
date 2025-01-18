"use server";

import { SessionPayload } from "@/app/(auth)/sign-up/schemas";
import { SignJWT, jwtVerify } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import "server-only";

const secretKey = process.env.SECRET_SESSION;
const encodedKey = new TextEncoder().encode(secretKey);

const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  },
  duration: 7 * 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("failed to verify session", error);
  }
}

export async function createSession(userId: number) {
  const cookieStore = await cookies();
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({
    userId,
    expires,
  });

  cookieStore.set(cookie.name, session, {
    ...cookie.options,
    expires,
  });
  revalidatePath("/");
}

export async function verifySession(): Promise<{ userId: number } | null> {
  const cookieStore = await cookies();
  const cookieFound = cookieStore.get(cookie?.name)?.value;
  const session = await decrypt(cookieFound);
  if (!session) return null;
  return {
    userId: session.userId as number,
  };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookie.name);
  revalidatePath("/");
}

import { cookies } from "next/headers";
import { ServerToastSchema } from "../schemas/config.schemas";
import { z } from "zod";

const TOAST_COOKIE = "toast-notification";

type ServerNotificationConfig = z.infer<typeof ServerToastSchema>;

type ServerNotificationOptions = Pick<
  ServerNotificationConfig,
  "position" | "description"
>;

function decodeCookieValue(value: string) {
  return ServerToastSchema.parse(JSON.parse(atob(value)));
}

function encode(data: ServerNotificationConfig): string {
  return btoa(JSON.stringify(data));
}

export async function getToastNotification() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(TOAST_COOKIE);

  if (!cookie) {
    return null;
  }
  try {
    return decodeCookieValue(cookie.value);
  } catch (error) {
    console.error("Failed to decode toast notification cookie", error);
    return null;
  }
}

async function setToastCookie(data: ServerNotificationConfig) {
  const cookieStore = await cookies();

  cookieStore.set(TOAST_COOKIE, encode(data), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    partitioned: true,
    maxAge: 0,
  });
}

export const serverToast = {
  success: async (message: string, options?: ServerNotificationOptions) => {
    await setToastCookie({
      id: Date.now(),
      message,
      variant: "success",
      ...options,
    });
  },
  error: async (message: string, options?: ServerNotificationOptions) => {
    await setToastCookie({
      id: Date.now(),
      message,
      variant: "error",
      ...options,
    });
  },
  warning: async (message: string, options?: ServerNotificationOptions) => {
    await setToastCookie({
      id: Date.now(),
      message,
      variant: "warning",
      ...options,
    });
  },
  info: async (message: string, options?: ServerNotificationOptions) => {
    await setToastCookie({
      id: Date.now(),
      message,
      variant: "info",
      ...options,
    });
  },
};

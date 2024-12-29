import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/session";

const protectedRoutes = ["/dashboard", "/sell"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const params = new URLSearchParams(request.nextUrl.searchParams);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const session = await verifySession();

    if (!session?.userId) {
      return NextResponse.redirect(
        new URL(
          `/sign-in${
            params.toString()
              ? `?redirect=${encodeURIComponent(params.toString())}`
              : ""
          }`,
          request.url
        )
      );
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

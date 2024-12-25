import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/session";

const protectedRoutes = "/dashboard";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith(protectedRoutes);

  if (isProtectedRoute) {
    const session = await verifySession();

    if (!session?.userId) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

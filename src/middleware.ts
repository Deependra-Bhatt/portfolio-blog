import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const adminAuth = req.cookies.get("admin-auth")?.value;

  // allow login page
  if (req.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  // block unauthorized users
  if (adminAuth !== "true") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

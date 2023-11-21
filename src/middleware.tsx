"use server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { UserResponse } from "@supabase/gotrue-js";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data }: UserResponse = await supabase.auth.getUser();
  if (
    (data.user && req.nextUrl.pathname === "/login") ||
    (data.user && req.nextUrl.pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/signup"],
};

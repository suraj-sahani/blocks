import { NextRequest, NextResponse } from "next/server";
import { getExistingSession } from "./lib/session";
import { Role } from "./lib/enum";

export async function middleware(request: NextRequest) {
  const isAuthenticated = (await getExistingSession()) ? true : false;
  const userRole = request.cookies.get("role")?.value;

  // Check if the user is authenticated
  // If the user is authenticated ad trying to access the sign-in or sign-up page, redirect them to the home page
  if (
    isAuthenticated &&
    ["/sign-up", "/sign-in"].includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //If user is authenticated and logged in as as user
  // but tries to access the hosts routes, redirect them to the user dashboard
  if (
    isAuthenticated &&
    userRole === Role.USER &&
    request.nextUrl.pathname.includes("/host")
  ) {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  // If user is authenticated and logged in as a host
  // but tries to access the user routes, redirect them to the host dashboard
  if (
    isAuthenticated &&
    userRole === Role.HOST &&
    request.nextUrl.pathname.includes("/user")
  ) {
    return NextResponse.redirect(new URL("/host/dashboard", request.url));
  }
  return NextResponse.next();
}

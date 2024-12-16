import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { UserInfo } from "./type/models";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname != "/signup" && !pathname.startsWith("/api/auth")) {
    const cookies = request.cookies.get("userInfo")?.value;

    if (!cookies) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }

    const userInfo: UserInfo = JSON.parse(cookies);
    if (!userInfo.userName || !userInfo.jobTitle) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!.*\\.(?:svg|jpg|jpeg|png|css|js|woff|woff2|ttf|otf|map|json)$).*)", // remove static file
  ],
};

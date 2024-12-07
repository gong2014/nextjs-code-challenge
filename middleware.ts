import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname != "/signup" && !pathname.startsWith("/api/auth")) {
    const isRegister = request.cookies.has("userInfo");

    if (!isRegister) {
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

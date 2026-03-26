import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const STATIC_FILE_REGEX = /\.(?:lottie|wasm|mp4|webm|ogg|mp3|wav|json|svg|png|jpg|jpeg|gif|webp|ico|css|js|txt|xml|pdf|zip)$/i;

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass locale routing for all static assets — prevents /fr/file.lottie 404s
  if (STATIC_FILE_REGEX.test(pathname)) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico).*)"],
};

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const STATIC_FILE_REGEX = /\.(?:lottie|wasm|mp4|webm|ogg|mp3|wav|json|svg|png|jpg|jpeg|gif|webp|ico|css|js|txt|xml|pdf|zip)$/i;

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Case 1 — /fr/file.lottie or /en/file.lottie
  // next-intl internally rewrites /file.lottie → /[locale]/file.lottie
  // We intercept and rewrite back to the actual public file path
  const localeFileMatch = pathname.match(/^\/(?:fr|en)(\/[^/]+)$/);
  if (localeFileMatch && STATIC_FILE_REGEX.test(localeFileMatch[1])) {
    return NextResponse.rewrite(new URL(localeFileMatch[1], request.url));
  }

  // Case 2 — /file.lottie (no locale prefix yet)
  // Bypass locale routing entirely — serve directly from public/
  if (STATIC_FILE_REGEX.test(pathname)) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico).*)"],
};

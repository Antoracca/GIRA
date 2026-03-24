import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except:
  // - api routes
  // - _next/static (Next.js build files)
  // - _next/image (image optimization)
  // - favicon, images, and other public files
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|lottie|wasm|mp4|json)).*)",
  ],
};

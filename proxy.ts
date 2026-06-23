import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";

// Next.js 16 renamed Middleware to Proxy. Same functionality.
// Redirects any locale-less path to a localized one (honouring Accept-Language).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const detected = accept.startsWith("ru") || accept.includes(",ru") ? "ru" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${detected}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except Next internals, the API, and static asset files.
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};

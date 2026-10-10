import { NextResponse, type NextRequest } from "next/server";

const locales = ["ge", "en", "ru"];

function pickLocale(req: NextRequest) {
  const header = req.headers.get("accept-language")?.toLowerCase() ?? "";
  if (header.startsWith("ru")) return "ru";
  if (header.startsWith("en")) return "en";
  return "ge";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;
  // Georgian is the main language; only switch for explicit RU/EN browsers.
  request.nextUrl.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\..*).*)"],
};

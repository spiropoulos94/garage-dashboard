import { validateSession } from "@/app/helpers/sessionHelpers";
import { getFromSession } from "@/app/helpers/sessionHelpers";
import { isRequestInMockMode, handleMockApiRequest } from "@/app/services/mockMiddlewareService";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isDev = process.env.NODE_ENV === "development";

const locales = ["en_US", "de_DE"];
const defaultLocale = "de_DE";

// TODO: Revert if we have no internal endpoints
const handleAPIRequest = async (request: NextRequest) => {
  // allow access on health check endpoint
  if (request.nextUrl.pathname === "/api/health") {
    return;
  }

  // Use mock service to check if in mock mode
  if (isRequestInMockMode(request)) {
    return handleMockApiRequest(request);
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isAPIRoute = pathname.startsWith("/api");

  // Do not run middleware in sentry example page on localhost
  if (isDev && pathname.includes("sentry-example-page")) return;

  // API route handling is a temporary solution in order to make sure that we include the authorization header in external requests
  if (isAPIRoute) {
    return handleAPIRequest(request);
  }

  const isAuthPage =
    pathname.includes("login") ||
    pathname.includes("forgot-password") ||
    pathname.includes("reset-password");

  const isUserLoggedIn = validateSession();
  const isMockMode = isRequestInMockMode(request);

  // Parse the locale from the pathname
  const localeMatch = pathname.match(/^\/([a-z]{2}_[A-Z]{2})\//);
  const pathnameLocale = localeMatch ? localeMatch[1] : null;

  // Get the locale from session first
  const sessionLocale = getFromSession("locale") || pathnameLocale || defaultLocale;

  let locale = sessionLocale;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // If the pathname has a locale but it's not the session locale, redirect to the session locale
  if (pathnameHasLocale && pathnameLocale && pathnameLocale !== sessionLocale) {
    const newUrl = new URL(`/${sessionLocale}${pathname.substring(6)}${search}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // if user is not logged in, redirect to login page
  if (!isUserLoggedIn && !isMockMode) {
    // if pathname does not include locale, add it and redirect to the new pathname
    if (isAuthPage && !pathnameHasLocale) {
      return NextResponse.redirect(new URL(`/${locale}${pathname}${search}`, request.url));
    }

    if (isAuthPage && pathnameHasLocale) return;

    // redirect to login page
    const encodedPathname = encodeURIComponent(pathname);
    const encodedSearch = encodeURIComponent(search);
    const redirectToStr = pathname !== "/" ? `?redirectTo=${encodedPathname}${encodedSearch}` : ""; // if pathname is not root, add it to the query string as redirectTo so deep linking is possible
    return NextResponse.redirect(new URL(`/${locale}/login${redirectToStr}`, request.url));
  }

  // if user is logged in and tries to access login page, redirect to home
  if (isAuthPage && (isUserLoggedIn || isMockMode)) {
    return NextResponse.redirect(new URL(`/${locale}${search}`, request.url));
  }

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${locale}${pathname}`;

  // e.g. incoming request is /bookings
  // The new URL is now /en-US/bookings
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - login (login page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|monitoring|favicon.ico|images).*)", // removed api so we can also protect the api routes
    "/",
  ],
};

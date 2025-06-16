import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./i18n/settings";

acceptLanguage.languages(languages);

// Define paths for your static public assets that should NOT be locale-prefixed
const PUBLIC_FILE_ASSETS = [
  // You already have some excluded in matcher, but for redundancy and clarity
  "/videos/", // Any video file in the videos folder
  "/images/", // Any image file in the images folder
  // Add other static asset paths as needed, e.g., '/fonts/', '/data/'
  "favicon.ico",
  "site.webmanifest",
  "sw.js",
];

export const config = {
  matcher: [
    // Your existing matcher is good for filtering out Next.js internal paths and API routes
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // IMPORTANT: Bypass middleware entirely for known static public assets
  // This check should come BEFORE any language redirection logic
  if (
    PUBLIC_FILE_ASSETS.some((path) => pathname.startsWith(path)) ||
    pathname.endsWith(".mp4") || // More specific for video files
    pathname.endsWith(".jpg") || // More specific for image files
    pathname.endsWith(".png") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".gif") ||
    pathname.endsWith(".json") || // If you serve static JSON
    pathname.endsWith(".xml") || // If you serve static XML
    pathname.endsWith(".txt") // If you serve static text files
  ) {
    return NextResponse.next();
  }

  // --- Original language detection and redirection logic follows ---
  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported (this is the block that was redirecting your video)
  if (
    !languages.some((loc) => pathname.startsWith(`/${loc}`)) &&
    !pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(new URL(`/${lng}${pathname}`, req.url));
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}

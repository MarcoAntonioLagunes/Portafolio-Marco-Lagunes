import { NextResponse, type NextRequest } from "next/server";
import { isLocale, LOCALE_COOKIE, LOCALES, pickLocale, PROJECTS_SEGMENT } from "@/content/locales";

/**
 * Redirige cualquier ruta sin prefijo de idioma (/, /proyectos/x…) a /es o /en.
 * Prioridad: cookie NEXT_LOCALE (elección manual con el toggle) > Accept-Language > español.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasLocale) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = saved && isLocale(saved) ? saved : pickLocale(request.headers.get("accept-language"));

  // Links sin idioma a un caso de estudio usan el segmento del idioma elegido (/projects ↔ /proyectos).
  const [, first, ...rest] = pathname.split("/");
  const isProjects = first === PROJECTS_SEGMENT.es || first === PROJECTS_SEGMENT.en;
  const tail = isProjects ? `/${PROJECTS_SEGMENT[locale]}/${rest.join("/")}` : pathname === "/" ? "" : pathname;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${tail}`;
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Excluye internos de Next y todo lo que tenga punto (archivos de public/, robots.txt, sitemap.xml,
  // __forms.html, PDFs, imágenes) para que se sirvan tal cual.
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};

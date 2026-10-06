import type { Locale } from "./types";

/** Utilidades de idioma sin contenido: seguras para proxy.ts y componentes cliente. */
export const LOCALES: Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";
/** Cookie con el idioma elegido manualmente; tiene prioridad sobre Accept-Language. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value);
}

/** Segmento de la ruta de casos de estudio por idioma. */
export const PROJECTS_SEGMENT: Record<Locale, string> = { es: "proyectos", en: "projects" };

export function homePath(locale: Locale): string {
  return `/${locale}`;
}

export function projectPath(locale: Locale, slug: string): string {
  return `/${locale}/${PROJECTS_SEGMENT[locale]}/${slug}`;
}

/** Ruta equivalente en otro idioma (home o caso de estudio). Los slugs son iguales en ambos idiomas. */
export function translatePath(pathname: string, to: Locale): string {
  const [, , segment, slug] = pathname.split("/");
  if (slug && (segment === PROJECTS_SEGMENT.es || segment === PROJECTS_SEGMENT.en)) return projectPath(to, slug);
  return homePath(to);
}

/** Elige el idioma a partir de Accept-Language (q-values incluidos). */
export function pickLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q === undefined ? 1 : Number(q) };
    })
    .filter((entry) => entry.q > 0)
    .sort((a, b) => b.q - a.q);
  const match = ranked.find((entry) => isLocale(entry.lang));
  return match ? (match.lang as Locale) : DEFAULT_LOCALE;
}

export type { Locale } from "./types";

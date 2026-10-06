import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/content/locales";

/**
 * canonical del idioma actual + hreflang de todas las versiones (y x-default → español).
 * `pathFor` construye la ruta equivalente en cada idioma.
 */
export function localeAlternates(current: Locale, pathFor: (locale: Locale) => string) {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) languages[locale] = pathFor(locale);
  languages["x-default"] = pathFor(DEFAULT_LOCALE);
  return { canonical: pathFor(current), languages };
}

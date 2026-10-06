import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/content/locales";
import type { Profile } from "@/content/types";
import { GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/lib/site";

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

const isPlaceholder = (value: string) => value.includes("[COMPLETAR");

/** JSON-LD schema.org/Person generado desde el perfil (omite datos con [COMPLETAR]). */
export function personJsonLd(profile: Profile, url: string) {
  const alumniOf = profile.education
    .filter((item) => !isPlaceholder(item.institution))
    .map((item) => ({ "@type": "CollegeOrUniversity", name: item.institution }));
  const knowsAbout = [
    ...profile.stack.flatMap((category) => category.skills),
    ...profile.interests,
  ].filter((topic, i, all) => !isPlaceholder(topic) && all.indexOf(topic) === i);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.person.name,
    url,
    image: `${SITE_URL}/images/image.png`,
    jobTitle: profile.person.jobTitle,
    description: profile.meta.description,
    email: `mailto:${profile.person.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Boca del Río", addressRegion: "Veracruz", addressCountry: "MX" },
    alumniOf,
    knowsAbout,
    knowsLanguage: profile.languages.map((lang) => lang.name),
    sameAs: [GITHUB_URL, LINKEDIN_URL],
  };
}

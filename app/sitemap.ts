import type { MetadataRoute } from "next";
import { getProfile, homePath, LOCALES, projectPath } from "@/content";
import { localeAlternates } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

/** Home y casos de estudio en ambos idiomas, cada URL con sus alternativas hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (languages: Record<string, string>) =>
    Object.fromEntries(Object.entries(languages).map(([lang, path]) => [lang, `${SITE_URL}${path}`]));

  return LOCALES.flatMap((locale) => {
    const home = localeAlternates(locale, homePath);
    const projects = getProfile(locale).projects.map((project) => {
      const alt = localeAlternates(locale, (l) => projectPath(l, project.slug));
      return {
        url: `${SITE_URL}${alt.canonical}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages: abs(alt.languages) },
      };
    });
    return [
      {
        url: `${SITE_URL}${home.canonical}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 1,
        alternates: { languages: abs(home.languages) },
      },
      ...projects,
    ];
  });
}

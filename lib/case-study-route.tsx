import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { getProfile, homePath, isLocale, projectPath, type Locale } from "@/content";
import { renderOgImage } from "@/lib/og";
import { localeAlternates } from "@/lib/seo";

type Params = Promise<{ lang: string; slug: string }>;

/**
 * Rutas de caso de estudio por idioma: /es/proyectos/[slug] y /en/projects/[slug] comparten
 * implementación; cada carpeta solo genera las páginas de su idioma (dynamicParams = false → 404 en el otro).
 */
export function caseStudyRoute(locale: Locale) {
  async function resolve(params: Params) {
    const { lang, slug } = await params;
    if (!isLocale(lang) || lang !== locale) return null;
    const profile = getProfile(lang);
    const index = profile.projects.findIndex((p) => p.slug === slug);
    if (index === -1) return null;
    return { profile, index, project: profile.projects[index] };
  }

  return {
    generateStaticParams() {
      return getProfile(locale).projects.map((project) => ({ lang: locale, slug: project.slug }));
    },

    async generateMetadata({ params }: { params: Params }): Promise<Metadata> {
      const data = await resolve(params);
      if (!data) return {};
      const { profile, project } = data;
      const title = `${project.title} — ${profile.ui.caseStudy.label}`;
      const alternates = localeAlternates(locale, (l) => projectPath(l, project.slug));
      return {
        title,
        description: project.summary,
        alternates,
        openGraph: { type: "article", url: alternates.canonical, title, description: project.summary },
      };
    },

    async Page({ params }: { params: Params }) {
      const data = await resolve(params);
      if (!data) notFound();
      const { profile, project, index } = data;
      const next = profile.projects[(index + 1) % profile.projects.length];
      return (
        <CaseStudy
          profile={profile}
          project={project}
          next={next}
          homePath={homePath(locale)}
          projectPath={(slug) => projectPath(locale, slug)}
        />
      );
    },

    async OgImage({ params }: { params: Params }) {
      const data = await resolve(params);
      const profile = getProfile(locale);
      const project = data?.project ?? profile.projects[0];
      return renderOgImage({
        badge: profile.ui.projects.status[project.status],
        title: project.title,
        subtitle: project.subtitle,
        body: project.stack.join(" · "),
        footerLeft: `${profile.person.name} · ${profile.ui.caseStudy.label}`,
      });
    },

  };
}

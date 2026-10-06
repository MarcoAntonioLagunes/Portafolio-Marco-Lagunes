import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/sections/Hero";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Now } from "@/sections/Now";
import { Education } from "@/sections/Education";
import { Certifications } from "@/sections/Certifications";
import { Skills } from "@/sections/Skills";
import { Strengths } from "@/sections/Strengths";
import { Contact } from "@/sections/Contact";
import { getProfile, homePath, isLocale, projectPath } from "@/content";
import { localeAlternates, personJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

/** ISR: la sección "Ahora mismo" consulta GitHub; la página se regenera como máximo cada 24 h. */
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const alternates = localeAlternates(lang, homePath);
  return { alternates, openGraph: { url: alternates.canonical } };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const profile = getProfile(lang);
  return (
    <main id="top" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(profile, `${SITE_URL}${homePath(lang)}`)) }}
      />
      <Hero profile={profile} />
      <Experience profile={profile} />
      <Projects profile={profile} projectPath={(slug) => projectPath(lang, slug)} />
      <Now profile={profile} />
      <Education profile={profile} />
      <Certifications profile={profile} />
      <Skills profile={profile} />
      <Strengths profile={profile} />
      <Contact profile={profile} />
    </main>
  );
}

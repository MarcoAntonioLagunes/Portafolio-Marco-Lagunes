import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { getProfile } from "@/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProfile().projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProfile();
  const project = profile.projects.find((p) => p.slug === slug);
  if (!project) return {};
  const path = `/proyectos/${project.slug}`;
  const title = `${project.title} — ${profile.ui.caseStudy.label}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const profile = getProfile();
  const index = profile.projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = profile.projects[index];
  const next = profile.projects[(index + 1) % profile.projects.length];

  return <CaseStudy profile={profile} project={project} next={next} homePath="/" projectPath={(s) => `/proyectos/${s}`} />;
}

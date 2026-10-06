import { getProfile } from "@/content";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Marco Lagunes";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProfile().projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = getProfile();
  const project = profile.projects.find((p) => p.slug === slug) ?? profile.projects[0];
  return renderOgImage({
    badge: profile.ui.projects.status[project.status],
    title: project.title,
    subtitle: project.subtitle,
    body: project.stack.join(" · "),
    footerLeft: `${profile.person.name} · ${profile.ui.caseStudy.label}`,
  });
}

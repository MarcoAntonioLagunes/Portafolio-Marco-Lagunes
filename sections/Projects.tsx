import Link from "next/link";
import { ArrowRight, Hammer } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import type { Profile, UpcomingProject } from "@/content/types";

function UpcomingProjectCard({ project, badge, etaLabel }: { project: UpcomingProject; badge: string; etaLabel: string }) {
  return (
    <article className="reveal flex h-full flex-col rounded-xl border border-dashed border-accent/40 bg-[repeating-linear-gradient(135deg,hsl(var(--card))_0_12px,hsl(var(--muted)/0.45)_12px_24px)] p-6">
      <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-beacon">
        <Hammer aria-hidden="true" className="h-3 w-3" />
        {badge}
      </span>
      <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
      {project.eta && (
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {etaLabel}: {project.eta}
        </p>
      )}
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-6">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded border border-border bg-muted/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Projects({ profile, projectPath }: { profile: Profile; projectPath: (slug: string) => string }) {
  const { projects, upcomingProject, ui } = profile;
  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="relative isolate scroll-mt-24 overflow-hidden border-t border-border bg-surface2/40 py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading id="proyectos-title" {...ui.sections.projects} />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              strings={{ ...ui.projects, status: ui.projects.status[project.status] }}
            >
              <Link
                href={projectPath(project.slug)}
                className="group/cs mt-5 inline-flex items-center gap-2 rounded-md bg-accent/15 px-4 py-2 text-sm font-medium text-beacon transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {ui.projects.caseStudy}
                <span className="sr-only">: {project.title}</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover/cs:translate-x-0.5 motion-reduce:transition-none" />
              </Link>
            </ProjectCard>
          ))}
          {upcomingProject && (
            <UpcomingProjectCard project={upcomingProject} badge={ui.projects.upcomingBadge} etaLabel={ui.projects.upcomingEta} />
          )}
        </div>
      </div>
    </section>
  );
}

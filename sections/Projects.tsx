import { Hammer } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { FloatingCodeBackground } from "@/components/FloatingCodeBackground";
import type { Profile, UpcomingProject } from "@/content/types";

function UpcomingProjectCard({ project, badge, etaLabel }: { project: UpcomingProject; badge: string; etaLabel: string }) {
  return (
    <article className="reveal flex h-full flex-col rounded-2xl border border-dashed border-accent/40 bg-[repeating-linear-gradient(135deg,hsl(var(--card))_0_12px,hsl(var(--muted)/0.45)_12px_24px)] p-6">
      <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-lavender">
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
          <li key={tech} className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Projects({ profile }: { profile: Profile }) {
  const { projects, upcomingProject, ui } = profile;
  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="relative isolate scroll-mt-24 overflow-hidden border-t border-border bg-surface2/40 py-24">
      <FloatingCodeBackground density="medium" variant="projects" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading id="proyectos-title" {...ui.sections.projects} />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              strings={{ ...ui.projects, status: ui.projects.status[project.status] }}
            />
          ))}
          {upcomingProject && (
            <UpcomingProjectCard project={upcomingProject} badge={ui.projects.upcomingBadge} etaLabel={ui.projects.upcomingEta} />
          )}
        </div>
      </div>
    </section>
  );
}

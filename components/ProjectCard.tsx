"use client";

import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { ProjectGallery, type GalleryStrings } from "@/components/ProjectGallery";
import type { ProjectItem } from "@/content/types";

export interface ProjectCardStrings extends GalleryStrings {
  status: string;
  visit: string;
  opensInNewTab: string;
}

const MAX_TILT_DEG = 6;

export function ProjectCard({
  project,
  strings,
  children,
}: {
  project: ProjectItem;
  strings: ProjectCardStrings;
  /** Acciones al pie de la tarjeta (p. ej. link al caso de estudio), renderizadas en el servidor. */
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  // Tilt 3D con variables CSS (sin re-render). Solo con mouse y sin reduced-motion.
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tilt-x", `${(-y * MAX_TILT_DEG * 2).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(x * MAX_TILT_DEG * 2).toFixed(2)}deg`);
  };

  const handleMouseLeave = () => {
    ref.current?.style.removeProperty("--tilt-x");
    ref.current?.style.removeProperty("--tilt-y");
  };

  const isProduction = project.status === "production";

  return (
    // La animación de revelado vive en el wrapper: su transform no pisa el del tilt.
    <div className="reveal h-full">
      <article
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="project-card group flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 hover:border-accent/50 hover:shadow-[0_0_36px_-10px_hsl(var(--accent)/0.55)]"
      >
        <div>
          <span
            className={
              "mb-4 inline-flex w-fit items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest " +
              (isProduction ? "border-sonar/40 bg-sonar/10 text-sonar" : "border-border bg-muted text-muted-foreground")
            }
          >
            {isProduction && (
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sonar opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sonar" />
              </span>
            )}
            {strings.status}
          </span>

          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
              <p className="text-sm text-accent">{project.subtitle}</p>
            </div>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${strings.visit}: ${project.title} ${strings.opensInNewTab}`}
                data-event="click_project_demo"
                data-event-project={project.slug}
                className="shrink-0 rounded-sm p-1 text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
            )}
          </div>

          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">{project.period}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

          {project.gallery.length > 0 && (
            <ProjectGallery items={project.gallery} mockUrl={project.mockUrl} projectTitle={project.title} strings={strings} />
          )}
        </div>

        <div className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded border border-border bg-muted/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                {tech}
              </li>
            ))}
          </ul>
          {children}
        </div>
      </article>
    </div>
  );
}

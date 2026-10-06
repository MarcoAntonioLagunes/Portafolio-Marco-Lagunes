"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ProjectGallery, type GalleryStrings } from "@/components/ProjectGallery";
import type { ProjectItem } from "@/content/types";

export interface ProjectCardStrings extends GalleryStrings {
  status: string;
  visit: string;
  opensInNewTab: string;
}

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
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // El tilt solo aplica con mouse y sin reduced-motion; se evalúa en el evento, no en un efecto.
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isProduction = project.status === "production";

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="reveal group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-[box-shadow,border-color] duration-300 hover:border-accent/50 hover:shadow-[0_0_36px_-10px_hsl(var(--accent)/0.55)]"
    >
      <div>
        <span
          className={
            "mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest " +
            (isProduction ? "border-mint/40 bg-mint/10 text-mint" : "border-border bg-muted text-muted-foreground")
          }
        >
          {isProduction && (
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
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
            <li key={tech} className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
              {tech}
            </li>
          ))}
        </ul>
        {children}
      </div>
    </motion.article>
  );
}

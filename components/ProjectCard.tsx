"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { fadeInUpProps } from "@/lib/animations";
import { ProjectGallery } from "@/components/ProjectGallery";
import type { ProjectItem } from "@/lib/types";

export function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltEnabled, setTiltEnabled] = useState(false);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  useEffect(() => {
    setTiltEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...fadeInUpProps(!!reduced, index * 0.1)}
      whileHover={reduced ? undefined : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      whileTap={reduced ? undefined : { y: -2, transition: { duration: 0.15, ease: "easeOut" } }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/0 transition-[box-shadow,border-color] duration-300 hover:border-accent/50 hover:shadow-[0_0_36px_-10px_hsl(var(--accent)/0.55)]"
    >
      <div>
        {project.status && (
          <span
            className={
              "mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest " +
              (project.status === "En producción"
                ? "border-mint/40 bg-mint/10 text-mint"
                : "border-border bg-muted text-muted-foreground")
            }
          >
            {project.status === "En producción" && (
              <span className="relative flex h-1.5 w-1.5">
                {!reduced && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
            )}
            {project.status}
          </span>
        )}

        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
            <p className="text-sm text-accent">{project.subtitle}</p>
          </div>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver ${project.title} (se abre en una pestaña nueva)`}
              className="shrink-0 text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        {project.period && (
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {project.period}
          </p>
        )}

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {project.gallery && project.gallery.length > 0 && (
          <ProjectGallery items={project.gallery} mockUrl={project.mockUrl} projectTitle={project.title} />
        )}
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

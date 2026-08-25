"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { fadeInUpProps } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/lib/types";

export function ProjectCard({
  project,
  index,
  className,
}: {
  project: ProjectItem;
  index: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const preview = project.gallery?.[0];

  const handleEnter = () => {
    if (!reduced) videoRef.current?.play().catch(() => {});
  };
  const handleLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <motion.div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...fadeInUpProps(!!reduced, index * 0.1)}
      className={cn(
        "group relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl border p-6",
        "border-white/[0.08] bg-[#0d1117] transition-[border-color,box-shadow] duration-300",
        "hover:border-[rgba(124,111,224,0.4)] hover:shadow-[0_0_40px_-8px_rgba(124,111,224,0.35)]",
        className,
      )}
    >
      {preview && (
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {preview.type === "video" ? (
            <video
              ref={videoRef}
              src={preview.src}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={preview.src}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/85 to-[#0d1117]/50" />
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          {project.status ? (
            <span
              className={cn(
                "inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest",
                project.status === "En producción"
                  ? "border-mint/40 bg-mint/10 text-mint"
                  : "border-white/10 bg-white/5 text-white/50",
              )}
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
          ) : (
            <span />
          )}

          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver ${project.title} (se abre en una pestaña nueva)`}
              className="shrink-0 rounded-full p-1.5 text-white/40 transition-colors hover:text-[#7C6FE0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-[#7C6FE0]">{project.subtitle}</p>

        <p className="mt-3 line-clamp-2 max-w-lg text-sm leading-relaxed text-white/50">
          {project.description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-8">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/60"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

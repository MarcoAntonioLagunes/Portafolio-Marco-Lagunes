import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="proyectos" className="scroll-mt-24 border-t border-border bg-surface2/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="proyectos" title="Proyectos destacados" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              className={project.subtitle === "ASOMMMN" ? "md:col-span-2" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

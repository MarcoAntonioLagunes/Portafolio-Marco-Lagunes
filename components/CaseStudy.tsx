import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ProjectGallery } from "@/components/ProjectGallery";
import { SocialIcon } from "@/components/SocialIcon";
import { WithPlaceholders } from "@/components/WithPlaceholders";
import type { Profile, ProjectItem } from "@/content/types";

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="reveal border-t border-border pt-10">
      <h2 id={id} className="font-mono text-xs uppercase tracking-widest text-accent">{`// ${title}`}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>
            <WithPlaceholders text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

const pillLink =
  "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Página de caso de estudio. `homePath` y `projectPath` permiten reutilizarla por idioma. */
export function CaseStudy({
  profile,
  project,
  next,
  homePath,
  projectPath,
}: {
  profile: Profile;
  project: ProjectItem;
  next: ProjectItem;
  homePath: string;
  projectPath: (slug: string) => string;
}) {
  const { ui } = profile;
  const t = ui.caseStudy;
  const cs = project.caseStudy;
  const isProduction = project.status === "production";

  return (
    <main id="top" className="relative flex-1 pb-24 pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-grid-glow" />
      <article className="relative mx-auto max-w-4xl px-6">
        <Link href={`${homePath}#proyectos`} className="inline-flex items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" /> {t.back}
        </Link>

        <header className="mt-8">
          <span
            className={
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest " +
              (isProduction ? "border-mint/40 bg-mint/10 text-mint" : "border-border bg-muted text-muted-foreground")
            }
          >
            {isProduction && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-mint" />}
            {ui.projects.status[project.status]}
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gradient-hero sm:text-5xl">{project.title}</h1>
          <p className="mt-2 text-lg text-accent">{project.subtitle}</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.period}: {project.period}
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/90">{project.summary}</p>
        </header>

        {project.gallery.length > 0 && (
          <div className="mt-10">
            <h2 className="sr-only">{t.gallery}</h2>
            <ProjectGallery
              items={project.gallery}
              mockUrl={project.mockUrl}
              projectTitle={project.title}
              strings={ui.projects}
              sizes="(max-width: 896px) 100vw, 848px"
            />
          </div>
        )}

        <div className="mt-14 space-y-12">
          <Block id="problema" title={t.problem}>
            <Bullets items={cs.problem} />
          </Block>

          <Block id="rol" title={t.role}>
            <Bullets items={cs.role} />
          </Block>

          <Block id="arquitectura" title={t.architecture}>
            <ArchitectureDiagram diagram={cs.architecture} id={`arch-${project.slug}`} label={`${t.architecture}: ${project.title}`} />
          </Block>

          <Block id="decisiones" title={t.decisions}>
            <div className="grid gap-4 md:grid-cols-2">
              {cs.decisions.map((decision) => (
                <div key={decision.title} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground">{decision.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <WithPlaceholders text={decision.body} />
                  </p>
                </div>
              ))}
            </div>
          </Block>

          <Block id="seguridad" title={t.security}>
            <Bullets items={cs.security} />
          </Block>

          <Block id="impacto" title={t.impact}>
            <Bullets items={cs.impact} />
          </Block>

          <Block id="stack" title={t.stack}>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
                  {tech}
                </li>
              ))}
            </ul>
          </Block>

          {(project.demoUrl || project.repoUrl) && (
            <Block id="links" title={t.links}>
              <div className="flex flex-wrap gap-3">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" data-event="click_project_demo" className={pillLink}>
                    <ExternalLink aria-hidden="true" className="h-4 w-4 text-accent" /> {ui.projects.visit}
                    <span className="sr-only">{ui.projects.opensInNewTab}</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" data-event="click_github" className={pillLink}>
                    <SocialIcon icon="github" className="h-4 w-4 text-accent" /> {ui.projects.repo}
                    <span className="sr-only">{ui.projects.opensInNewTab}</span>
                  </a>
                )}
              </div>
            </Block>
          )}
        </div>

        <nav aria-label={t.nextProject} className="mt-16 border-t border-border pt-10">
          <Link
            href={projectPath(next.slug)}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>
              <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">{t.nextProject}</span>
              <span className="mt-1 block text-xl font-semibold text-foreground">{next.title}</span>
              <span className="block text-sm text-accent">{next.subtitle}</span>
            </span>
            <ArrowRight aria-hidden="true" className="h-6 w-6 shrink-0 text-accent transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </nav>
      </article>
    </main>
  );
}

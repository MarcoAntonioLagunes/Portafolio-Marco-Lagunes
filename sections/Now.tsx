import { GitBranch, Hammer, Star } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { WithPlaceholders } from "@/components/WithPlaceholders";
import type { Profile } from "@/content/types";
import { getRecentRepos } from "@/lib/github";
import { GITHUB_URL } from "@/lib/site";

function ListCard({ icon: Icon, title, items }: { icon: typeof Hammer; title: string; items: string[] }) {
  return (
    <div className="reveal rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <Icon aria-hidden="true" className="h-5 w-5 text-accent" />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sonar" />
            <span>
              <WithPlaceholders text={item} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** "Ahora mismo": qué construyo y mis repos públicos más recientes (GitHub API en build, revalidate 24 h). */
export async function Now({ profile }: { profile: Profile }) {
  const { now, ui, locale } = profile;
  const t = ui.now;
  const repos = await getRecentRepos(3);
  const dateFormat = new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", { dateStyle: "medium" });

  return (
    <section id="ahora" aria-labelledby="ahora-title" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="ahora-title" {...ui.sections.now} />

        <div className="grid gap-6">
          <ListCard icon={Hammer} title={t.building} items={now.building} />
        </div>

        <div className="reveal mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <GitBranch aria-hidden="true" className="h-4 w-4 text-accent" /> {t.repos}
            </h3>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-event="click_github"
              className="rounded-sm text-sm text-beacon transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t.viewProfile} →<span className="sr-only"> {ui.projects.opensInNewTab}</span>
            </a>
          </div>

          {repos.length > 0 ? (
            <ul className="mt-4 grid gap-4 md:grid-cols-3">
              {repos.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event="click_github"
                    className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="font-mono text-sm font-semibold text-foreground">{repo.name}</span>
                    {repo.description && <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{repo.description}</span>}
                    <span className="mt-auto flex items-center gap-4 pt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {repo.language && <span className="text-sonar">{repo.language}</span>}
                      {repo.stars > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <Star aria-hidden="true" className="h-3 w-3" /> {repo.stars}
                        </span>
                      )}
                      <span>
                        {t.updated} <time dateTime={repo.pushedAt}>{dateFormat.format(new Date(repo.pushedAt))}</time>
                      </span>
                    </span>
                    <span className="sr-only">{ui.projects.opensInNewTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">{t.reposEmpty}</p>
          )}
        </div>
      </div>
    </section>
  );
}

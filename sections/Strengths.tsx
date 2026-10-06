import { SectionHeading } from "@/components/SectionHeading";
import { ParticleBackground } from "@/components/ParticleBackground";
import type { Profile } from "@/content/types";

function PillBlock({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="reveal rounded-2xl border border-border bg-card p-6">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {values.map((value) => (
          <li key={value} className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Strengths({ profile }: { profile: Profile }) {
  const { strengths, languages, interests, ui } = profile;
  return (
    <section id="fortalezas" aria-labelledby="fortalezas-title" className="relative isolate scroll-mt-24 overflow-hidden border-t border-border py-24">
      <ParticleBackground density="low" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading id="fortalezas-title" {...ui.sections.strengths} />

        <div className="grid gap-6 md:grid-cols-3">
          <PillBlock title={ui.strengths.strengths} values={strengths} />

          <div className="reveal rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground">{ui.strengths.languages}</h3>
            <ul className="mt-4 space-y-4">
              {languages.map((lang) => (
                <li key={lang.name}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-foreground">{lang.name}</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{lang.level}</span>
                  </div>
                  <div aria-hidden="true" className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${lang.proficiency}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <PillBlock title={ui.strengths.interests} values={interests} />
        </div>
      </div>
    </section>
  );
}

import { Code2, Database, Server, ShieldCheck, Wrench } from "lucide-react";
import { Marquee } from "@/components/Marquee";
import { SectionHeading } from "@/components/SectionHeading";
import { PLACEHOLDER_RE } from "@/content/derived";
import type { Profile, SkillCategory } from "@/content/types";

const ICONS = {
  code: Code2,
  server: Server,
  shield: ShieldCheck,
  wrench: Wrench,
  data: Database,
} satisfies Record<SkillCategory["icon"], typeof Code2>;

export function Skills({ profile }: { profile: Profile }) {
  const { stack, ui } = profile;
  const categories = stack.filter((category) => category.skills.length > 0);
  // Los placeholders [COMPLETAR] se muestran en su tarjeta, pero no en la marquesina.
  const marqueeItems = categories.flatMap((category) => category.skills).filter((skill) => !PLACEHOLDER_RE.test(skill));

  return (
    <section id="stack" aria-labelledby="stack-title" className="relative isolate scroll-mt-24 overflow-hidden border-t border-border bg-surface2/40 py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading id="stack-title" {...ui.sections.stack} />

        <Marquee items={marqueeItems} label={ui.stackMarqueeLabel} className="mb-10" />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = ICONS[category.icon];
            return (
              <li key={category.category} className="reveal rounded-xl border border-border bg-card p-6">
                <Icon aria-hidden="true" className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-sm font-semibold text-foreground">{category.category}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="rounded border border-border bg-muted/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                      {skill}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

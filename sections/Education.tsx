import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { Profile } from "@/content/types";
import { cn } from "@/lib/utils";

export function Education({ profile }: { profile: Profile }) {
  const { education, ui } = profile;
  return (
    <section id="educacion" aria-labelledby="educacion-title" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="educacion-title" {...ui.sections.education} />
        <ul className="grid gap-6 md:grid-cols-2">
          {education.map((item) => {
            const inProgress = item.status === "in-progress";
            return (
              <li
                key={item.degree}
                className={cn(
                  "reveal flex gap-4 rounded-2xl border bg-card p-6",
                  inProgress ? "border-accent/50 shadow-[0_0_36px_-16px_hsl(var(--accent)/0.6)]" : "border-border",
                )}
              >
                <GraduationCap aria-hidden="true" className="h-6 w-6 shrink-0 text-accent" />
                <div className="min-w-0">
                  {item.badge && (
                    <span
                      className={cn(
                        "mb-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest",
                        inProgress ? "border-mint/40 bg-mint/10 text-mint" : "border-border bg-muted text-muted-foreground",
                      )}
                    >
                      {inProgress && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-mint" />}
                      {item.badge}
                    </span>
                  )}
                  <h3 className="text-base font-semibold text-foreground">{item.degree}</h3>
                  <p className="mt-1 text-sm text-accent">{item.institution}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">{item.period}</p>
                  {item.note && <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import type { ExperienceItem } from "@/content/types";

export function TimelineItem({ item, isLast }: { item: ExperienceItem; isLast?: boolean }) {
  return (
    <li className="reveal relative pb-10 pl-10 last:pb-0">
      <span aria-hidden="true" className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background" />
      {!isLast && <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-5 w-px bg-border" />}

      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{item.period}</p>
      <h3 className="mt-1 text-lg font-semibold text-foreground">
        {item.role} <span className="text-muted-foreground">—</span> {item.organization}
      </h3>
      <p className="text-sm text-accent">{item.location}</p>

      {item.timeline && item.timeline.length > 0 && (
        <div className="mt-4 rounded-xl border border-border bg-card/60 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{item.timelineLabel}</p>
          <ol className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1 sm:gap-y-2">
            {item.timeline.map((step, i) => (
              <li key={step.role} className="flex items-center gap-2 sm:gap-1">
                <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground">
                  {step.role}
                  <span className="ml-1.5 font-mono text-[10px] text-muted-foreground">{step.period}</span>
                </span>
                {i < item.timeline!.length - 1 && (
                  <span aria-hidden="true" className="hidden font-mono text-accent sm:inline">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      <ul className="mt-3 space-y-2">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2 text-sm text-muted-foreground">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

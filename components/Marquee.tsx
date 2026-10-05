import { cn } from "@/lib/utils";

const chipClass =
  "shrink-0 rounded-full border border-border bg-muted px-4 py-2 font-mono text-xs text-muted-foreground";

/**
 * Marquesina infinita solo con CSS. La segunda copia existe solo para el loop visual,
 * por eso va aria-hidden: los lectores de pantalla leen la lista una vez.
 * Con prefers-reduced-motion se oculta la copia y la lista se muestra estática y envuelta.
 */
export function Marquee({
  items,
  durationSeconds = 26,
  label,
  className,
}: {
  items: string[];
  durationSeconds?: number;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "marquee group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]",
        className,
      )}
    >
      <div
        className="marquee-track flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <ul aria-label={label} className="marquee-list flex shrink-0 gap-3 pr-3">
          {items.map((item) => (
            <li key={item} className={chipClass}>
              {item}
            </li>
          ))}
        </ul>
        <ul aria-hidden="true" className="marquee-copy flex shrink-0 gap-3 pr-3">
          {items.map((item) => (
            <li key={item} className={chipClass}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

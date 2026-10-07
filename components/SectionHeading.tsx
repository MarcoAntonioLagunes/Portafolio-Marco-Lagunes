import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  id,
  className,
}: {
  eyebrow: string;
  title: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("reveal mb-12", className)}>
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        <span>{`// ${eyebrow}`}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
      </p>
      <h2 id={id} className="display mt-4 text-[clamp(2.75rem,7vw,4.5rem)] text-foreground">
        {title}
      </h2>
    </div>
  );
}

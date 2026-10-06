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
      <p className="font-mono text-xs uppercase tracking-widest text-accent">{`// ${eyebrow}`}</p>
      <h2 id={id} className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

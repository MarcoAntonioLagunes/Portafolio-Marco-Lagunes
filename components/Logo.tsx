import { cn } from "@/lib/utils";

/** `decorative`: cuando el link contenedor ya tiene nombre accesible, el SVG se oculta del árbol a11y. */
export function Logo({ className, decorative = false }: { className?: string; decorative?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-8 w-8", className)}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Marco Lagunes"}
      aria-hidden={decorative ? true : undefined}
    >
      <rect width="48" height="48" rx="12" className="fill-navy" />
      <text x="50%" y="53%" textAnchor="middle" dominantBaseline="middle" className="fill-accent font-mono text-[18px] font-semibold">
        ML
      </text>
    </svg>
  );
}

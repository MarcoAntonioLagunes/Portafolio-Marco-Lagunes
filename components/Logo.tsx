import { cn } from "@/lib/utils";

/**
 * Monograma "ML". `decorative`: dentro de un link con nombre propio. Las iniciales se pintan con CSS
 * (::before) para que no compitan con el nombre accesible del link (WCAG 2.5.3, label-in-name).
 */
export function Logo({ className, decorative = false }: { className?: string; decorative?: boolean }) {
  if (decorative) {
    return <span aria-hidden="true" className={cn("logo-mark h-8 w-8", className)} />;
  }
  return (
    <svg viewBox="0 0 48 48" className={cn("h-8 w-8", className)} role="img" aria-label="Marco Lagunes">
      <rect width="48" height="48" rx="12" className="fill-navy" />
      <text x="50%" y="53%" textAnchor="middle" dominantBaseline="middle" className="fill-accent font-mono text-[18px] font-semibold">
        ML
      </text>
    </svg>
  );
}

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-8 w-8", className)}
      role="img"
      aria-label="Marco Lagunes"
    >
      <rect width="48" height="48" rx="12" className="fill-navy" />
      <text
        x="50%"
        y="53%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-accent font-mono text-[18px] font-semibold"
      >
        ML
      </text>
    </svg>
  );
}

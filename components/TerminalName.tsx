import { cn } from "@/lib/utils";

const START_DELAY_S = 0.2;
const CHAR_INTERVAL_S = 0.055;

/**
 * Nombre con efecto de tecleo, solo CSS: el texto completo llega en el HTML SSR
 * (crawlers, previews y lectores sin JS) y cada carácter aparece con un retraso escalonado.
 * Con prefers-reduced-motion se muestra completo de inmediato (ver .type-char en globals.css).
 */
export function TerminalName({ text, className }: { text: string; className?: string }) {
  const chars = Array.from(text);

  return (
    <h1 aria-label={text} className={cn(className)}>
      <span aria-hidden="true" className="text-gradient-hero">
        {chars.map((char, i) => (
          <span
            key={i}
            className="type-char"
            style={{ animationDelay: `${START_DELAY_S + i * CHAR_INTERVAL_S}s` }}
          >
            {char}
          </span>
        ))}
      </span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-blink bg-accent align-middle motion-reduce:animate-none"
      />
    </h1>
  );
}

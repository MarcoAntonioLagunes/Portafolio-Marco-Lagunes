import { cn } from "@/lib/utils";

const START_DELAY_S = 0.2;
const CHAR_INTERVAL_S = 0.055;

/**
 * Nombre con efecto de tecleo, solo CSS: el texto completo llega en el HTML SSR
 * (crawlers, previews y lectores sin JS) y cada carácter aparece con un retraso escalonado.
 * Cada palabra va en su propia línea; el espacio real entre ellas se conserva en el texto.
 * Con prefers-reduced-motion se muestra completo de inmediato (ver .type-char en globals.css).
 */
export function TerminalName({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  let index = 0;

  return (
    <h1 aria-label={text} className={cn(className)}>
      {words.map((word, w) => {
        const isLast = w === words.length - 1;
        return (
          <span key={word + w} aria-hidden="true" className="block">
            {Array.from(word).map((char) => {
              const delay = START_DELAY_S + index++ * CHAR_INTERVAL_S;
              return (
                <span key={index} className="type-char" style={{ animationDelay: `${delay}s` }}>
                  {char}
                </span>
              );
            })}
            {isLast && (
              <span className="ml-[0.06em] inline-block h-[0.72em] w-[0.09em] animate-blink bg-accent align-baseline motion-reduce:animate-none" />
            )}
            {!isLast && " "}
          </span>
        );
      })}
    </h1>
  );
}

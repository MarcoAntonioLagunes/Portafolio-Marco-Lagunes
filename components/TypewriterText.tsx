import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Titular con aparición palabra por palabra, solo CSS (sin JS).
 * - La frase completa llega en SSR con espacios reales.
 * - Lectores de pantalla leen la frase de corrido (span sr-only); los spans animados van aria-hidden.
 *   No se usa aria-label en el <p>: ARIA 1.2 prohíbe nombrar el rol paragraph y varios lectores lo ignoran.
 */
export function TypewriterText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <p className={cn("text-balance", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="word-reveal" style={{ animationDelay: `${0.3 + i * 0.06}s` }}>
              {word}
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </p>
  );
}

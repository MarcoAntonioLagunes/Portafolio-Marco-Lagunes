import { Fragment } from "react";

const SPLIT_RE = /(\[COMPLETAR:[^\]]*\])/g;

/** Renderiza texto resaltando los "[COMPLETAR: ...]" pendientes, para que no pasen desapercibidos. */
export function WithPlaceholders({ text }: { text: string }) {
  const parts = text.split(SPLIT_RE);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[COMPLETAR:") ? (
          <mark key={i} className="rounded border border-dashed border-amber-300/60 bg-amber-300/10 px-1 font-mono text-[0.85em] text-amber-200">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

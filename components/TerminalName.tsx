"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const START_DELAY_MS = 200;
const CHAR_INTERVAL_MS = 55;

export function TerminalName({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? text.length : 0);

  useEffect(() => {
    if (reduced || count >= text.length) return;
    const delay = count === 0 ? START_DELAY_MS : CHAR_INTERVAL_MS;
    const id = window.setTimeout(() => setCount((c) => c + 1), delay);
    return () => window.clearTimeout(id);
  }, [count, reduced, text.length]);

  return (
    <h1 aria-label={text} className={cn(className)}>
      <span aria-hidden="true" className="text-gradient-hero">
        {text.slice(0, count)}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] bg-accent align-middle",
          !reduced && "animate-blink",
        )}
      />
    </h1>
  );
}

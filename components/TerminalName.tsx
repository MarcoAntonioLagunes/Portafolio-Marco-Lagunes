"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useBooted } from "@/lib/boot-context";
import { cn } from "@/lib/utils";

export function TerminalName({ text, className }: { text: string; className?: string }) {
  const { booted } = useBooted();
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? text.length : 0);

  useEffect(() => {
    if (reduced || !booted || count >= text.length) return;
    const id = window.setTimeout(() => setCount((c) => c + 1), 55);
    return () => window.clearTimeout(id);
  }, [booted, count, reduced, text.length]);

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

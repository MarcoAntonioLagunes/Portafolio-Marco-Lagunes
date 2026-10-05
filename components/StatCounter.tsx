"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1000;

/**
 * El valor final se renderiza en SSR (lo que ven crawlers y lectores sin JS).
 * Solo en el cliente, al entrar en viewport y sin prefers-reduced-motion, se anima el conteo.
 */
export function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState<string>(match ? match[1] : value);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          setDisplay(Math.round(progress * target).toString());
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "-40px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <div ref={ref} className="px-2 py-5 text-center sm:px-4 sm:py-6">
      <p className="font-mono text-2xl font-semibold text-accent sm:text-3xl">
        <span className="sr-only">{value}</span>
        <span aria-hidden="true" className="tabular-nums">
          {display}
          {suffix}
        </span>
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
        {label}
      </p>
    </div>
  );
}

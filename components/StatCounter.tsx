"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(target === null ? value : "0");

  useEffect(() => {
    if (!inView || target === null) return;
    const duration = 1000;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * target).toString());
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <div ref={ref} className="px-2 py-5 text-center sm:px-4 sm:py-6">
      <p className="font-mono text-2xl font-semibold text-accent sm:text-3xl">
        {display}
        {suffix}
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
        {label}
      </p>
    </div>
  );
}

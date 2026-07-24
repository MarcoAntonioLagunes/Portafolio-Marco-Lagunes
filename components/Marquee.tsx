"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Marquee({
  items,
  durationSeconds = 26,
  className,
}: {
  items: string[];
  durationSeconds?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const handleVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  if (reduced) {
    return (
      <ul className={cn("flex flex-wrap justify-center gap-2", className)}>
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border bg-muted px-4 py-2 font-mono text-xs text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  const track = [...items, ...items];

  return (
    <div
      className={cn(
        "group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <ul
        className="flex w-max gap-3 animate-marquee group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${durationSeconds}s`,
          animationPlayState: tabHidden ? "paused" : undefined,
        }}
      >
        {track.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="shrink-0 rounded-full border border-border bg-muted px-4 py-2 font-mono text-xs text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

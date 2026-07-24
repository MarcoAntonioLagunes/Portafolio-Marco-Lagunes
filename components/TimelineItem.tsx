"use client";

import { motion } from "framer-motion";
import type { ExperienceItem } from "@/lib/types";

export function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: ExperienceItem;
  index: number;
  isLast?: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      className="relative pb-10 pl-10 last:pb-0"
    >
      <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background" />
      {!isLast && (
        <span className="absolute bottom-0 left-[5px] top-5 w-px bg-border" />
      )}

      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {item.period}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-foreground">{item.role}</h3>
      <p className="text-sm text-accent">
        {item.organization} · {item.location}
      </p>

      <ul className="mt-3 space-y-2">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2 text-sm text-muted-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.li>
  );
}

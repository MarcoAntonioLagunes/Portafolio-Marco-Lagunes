"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUpProps } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div {...fadeInUpProps(!!reduced)} className={cn("mb-12", className)}>
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {`// ${eyebrow}`}
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    </motion.div>
  );
}

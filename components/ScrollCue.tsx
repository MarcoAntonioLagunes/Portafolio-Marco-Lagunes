"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollCue({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div className={className}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Desplázate
      </p>
      <motion.div
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={reduced ? undefined : { duration: 1.6, ease: "easeInOut", repeat: Infinity }}
        className="mt-1 flex justify-center"
      >
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </motion.div>
    </div>
  );
}

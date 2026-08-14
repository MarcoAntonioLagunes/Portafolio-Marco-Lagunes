"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TypewriterText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <p role="text" aria-label={text} className={cn("text-balance", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease: "easeOut" }}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

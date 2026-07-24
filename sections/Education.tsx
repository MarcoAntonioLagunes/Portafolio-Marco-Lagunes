"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { fadeInUpProps } from "@/lib/animations";
import { education } from "@/lib/data";

export function Education() {
  const reduced = useReducedMotion();
  return (
    <section id="educacion" className="scroll-mt-24 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {education.map((item) => (
            <motion.div
              key={item.degree}
              {...fadeInUpProps(!!reduced)}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <GraduationCap className="h-6 w-6 shrink-0 text-accent" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">{item.degree}</h3>
                <p className="mt-1 text-sm text-accent">{item.institution}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {item.period}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

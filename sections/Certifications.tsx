"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeInUpProps } from "@/lib/animations";
import { certifications } from "@/lib/data";

export function Certifications() {
  const reduced = useReducedMotion();
  return (
    <section id="certificaciones" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="certificaciones" title="Certificaciones" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              {...fadeInUpProps(!!reduced, index * 0.06)}
              whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_0_28px_-12px_hsl(var(--accent)/0.5)]"
            >
              <div className="flex items-start justify-between gap-3">
                <Award className="h-5 w-5 shrink-0 text-accent" />
                {cert.note && (
                  <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {cert.note}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold leading-snug text-foreground">
                  {cert.name}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

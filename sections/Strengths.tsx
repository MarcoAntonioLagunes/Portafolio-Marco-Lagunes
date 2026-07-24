"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { EASE_OUT, fadeInUpItemVariants, staggerContainerProps, VIEWPORT_ONCE } from "@/lib/animations";
import { interests, languages, strengths } from "@/lib/data";

function PillBlock({
  title,
  values,
  reduced,
}: {
  title: string;
  values: string[];
  reduced: boolean;
}) {
  return (
    <motion.div variants={fadeInUpItemVariants(reduced)} className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {values.map((value) => (
          <li
            key={value}
            className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            {value}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function LanguagesBlock({ reduced }: { reduced: boolean }) {
  return (
    <motion.div variants={fadeInUpItemVariants(reduced)} className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-sm font-semibold text-foreground">Idiomas</h3>
      <div className="mt-4 space-y-4">
        {languages.map((lang) => (
          <div key={lang.name}>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-foreground">{lang.name}</span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {lang.level}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ scaleX: reduced ? lang.proficiency / 100 : 0 }}
                whileInView={{ scaleX: lang.proficiency / 100 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: reduced ? 0 : 0.8, ease: EASE_OUT }}
                className="h-full w-full origin-left rounded-full bg-accent"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Strengths() {
  const reduced = !!useReducedMotion();

  return (
    <section id="fortalezas" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="fortalezas" title="Fortalezas, idiomas e intereses" />

        <motion.div {...staggerContainerProps(reduced)} className="grid gap-6 md:grid-cols-3">
          <PillBlock title="Fortalezas" values={strengths} reduced={reduced} />
          <LanguagesBlock reduced={reduced} />
          <PillBlock title="Intereses" values={interests} reduced={reduced} />
        </motion.div>
      </div>
    </section>
  );
}

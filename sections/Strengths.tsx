"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { interests, languages, strengths } from "@/lib/data";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function PillBlock({ title, values }: { title: string; values: string[] }) {
  return (
    <motion.div variants={item} className="rounded-2xl border border-border bg-card p-6">
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

function LanguagesBlock() {
  return (
    <motion.div variants={item} className="rounded-2xl border border-border bg-card p-6">
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
                initial={{ width: "0%" }}
                whileInView={{ width: `${lang.proficiency}%` }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-accent"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Strengths() {
  return (
    <section id="fortalezas" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="fortalezas" title="Fortalezas, idiomas e intereses" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="grid gap-6 md:grid-cols-3"
        >
          <PillBlock title="Fortalezas" values={strengths} />
          <LanguagesBlock />
          <PillBlock title="Intereses" values={interests} />
        </motion.div>
      </div>
    </section>
  );
}

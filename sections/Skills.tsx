"use client";

import { motion } from "framer-motion";
import { Code2, Server, ShieldCheck, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { skills } from "@/lib/data";
import type { SkillCategory } from "@/lib/types";

const ICONS = {
  code: Code2,
  server: Server,
  shield: ShieldCheck,
  wrench: Wrench,
} satisfies Record<SkillCategory["icon"], typeof Code2>;

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

export function Skills() {
  return (
    <section id="stack" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="stack" title="Stack técnico" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skills.map((category) => {
            const Icon = ICONS[category.icon];
            return (
              <motion.div
                key={category.category}
                variants={item}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  {category.category}
                </h3>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

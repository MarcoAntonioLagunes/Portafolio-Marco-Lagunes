"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useBooted } from "@/lib/boot-context";

export function HeroAvatar({ avatarExists }: { avatarExists: boolean }) {
  const reduced = useReducedMotion();
  const { booted } = useBooted();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={booted ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      className="relative h-56 w-56 sm:h-64 sm:w-64"
    >
      <div aria-hidden="true" className="avatar-ring-dotted absolute -inset-3 rounded-full" />

      <div aria-hidden="true" className="avatar-ring-conic absolute -inset-1.5 rounded-full p-[3px]">
        <div className="h-full w-full rounded-full bg-background" />
      </div>

      <div className="absolute inset-0 overflow-hidden rounded-full border border-border shadow-2xl">
        {avatarExists ? (
          <Image
            src="/images/image.png"
            alt="Marco Lagunes, desarrollador Full-Stack"
            fill
            priority
            sizes="(max-width: 640px) 224px, 256px"
            className="object-cover object-[center_20%]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-navy font-mono text-4xl text-accent">
            ML
          </div>
        )}
      </div>

      <motion.div
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={reduced ? undefined : { duration: 3.2, ease: "easeInOut", repeat: Infinity }}
        className="absolute -bottom-3 -right-2 flex items-center gap-1.5 rounded-full border border-border bg-card/95 px-3 py-1.5 font-mono text-[11px] text-foreground shadow-lg backdrop-blur"
      >
        <span className="relative flex h-2 w-2">
          {!reduced && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
        </span>
        Disponible
      </motion.div>
    </motion.div>
  );
}

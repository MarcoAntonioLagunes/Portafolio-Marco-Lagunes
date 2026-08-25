"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem, GalleryVideoItem } from "@/lib/types";

function BrowserChrome({ mockUrl }: { mockUrl?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-t-lg border border-b-0 border-border bg-surface2 px-3 py-2">
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
      </div>
      {mockUrl && (
        <div className="flex-1 truncate rounded-full border border-border bg-muted px-3 py-0.5 text-center font-mono text-[10px] text-muted-foreground">
          {mockUrl}
        </div>
      )}
    </div>
  );
}

function GallerySlideVideo({
  item,
  active,
  reduced,
}: {
  item: GalleryVideoItem;
  active: boolean;
  reduced: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduced) return;
    if (active) {
      el.play().catch(() => {
        // Autoplay bloqueado por el navegador: se omite en silencio.
      });
    } else {
      el.pause();
    }
  }, [active, reduced]);

  return (
    <video
      ref={videoRef}
      src={item.src}
      poster={item.poster}
      muted
      loop
      playsInline
      preload="metadata"
      controls={hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={item.alt}
      className="h-full w-full object-cover"
    />
  );
}

export function ProjectGallery({
  items,
  mockUrl,
  projectTitle,
}: {
  items: GalleryItem[];
  mockUrl?: string;
  projectTitle: string;
}) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "-80px" });

  if (items.length === 0) return null;

  const goTo = (i: number) => setIndex((i + items.length) % items.length);
  const current = items[index];

  return (
    <div ref={containerRef} className="mt-4">
      <BrowserChrome mockUrl={mockUrl} />

      <div className="group/gallery relative aspect-video overflow-hidden rounded-b-lg border border-border bg-navy">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {current.type === "image" ? (
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 640px) 100vw, 400px"
                className="object-cover"
              />
            ) : (
              <GallerySlideVideo item={current} active={inView} reduced={!!reduced} />
            )}
          </motion.div>
        </AnimatePresence>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label={`Diapositiva anterior de ${projectTitle}`}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1.5 text-foreground opacity-0 transition-opacity duration-200 hover:text-accent focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover/gallery:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label={`Siguiente diapositiva de ${projectTitle}`}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1.5 text-foreground opacity-0 transition-opacity duration-200 hover:text-accent focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover/gallery:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div
          className="mt-2.5 flex justify-center gap-1.5"
          role="tablist"
          aria-label={`Galería de ${projectTitle}`}
        >
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Ir a la diapositiva ${i + 1} de ${items.length}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === index ? "w-4 bg-accent" : "w-1.5 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

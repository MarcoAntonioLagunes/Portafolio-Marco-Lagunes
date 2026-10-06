"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem, GalleryVideoItem } from "@/content/types";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export interface GalleryStrings {
  galleryLabel: string;
  prevSlide: string;
  nextSlide: string;
  goToSlide: string;
}

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
      controls={hovered || reduced}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
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
  strings,
  sizes = "(max-width: 640px) 100vw, 400px",
}: {
  items: GalleryItem[];
  mockUrl?: string;
  projectTitle: string;
  strings: GalleryStrings;
  sizes?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // El video solo se reproduce mientras la galería está en pantalla.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "-80px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  const goTo = (i: number) => setIndex((i + items.length) % items.length);
  const current = items[index];

  return (
    <div ref={containerRef} className="mt-4">
      <BrowserChrome mockUrl={mockUrl} />

      <div className="group/gallery relative aspect-video overflow-hidden rounded-b-lg border border-border bg-navy">
        {/* key = índice: cada cambio de diapositiva remonta el contenedor y dispara el fade CSS. */}
        <div key={index} className="gallery-slide absolute inset-0">
          {current.type === "image" ? (
            <Image src={current.src} alt={current.alt} fill sizes={sizes} className="object-cover" />
          ) : (
            <GallerySlideVideo item={current} active={inView} reduced={reduced} />
          )}
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label={`${strings.prevSlide} ${projectTitle}`}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1.5 text-foreground opacity-0 transition-opacity duration-200 hover:text-accent focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover/gallery:opacity-100"
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label={`${strings.nextSlide} ${projectTitle}`}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1.5 text-foreground opacity-0 transition-opacity duration-200 hover:text-accent focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover/gallery:opacity-100"
            >
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div
          className="mt-1.5 flex justify-center"
          role="group"
          aria-label={`${strings.galleryLabel} ${projectTitle}`}
        >
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-current={i === index ? "true" : undefined}
              aria-label={`${strings.goToSlide} ${i + 1} / ${items.length}`}
              onClick={() => goTo(i)}
              className="group/dot flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === index ? "w-4 bg-accent" : "w-1.5 bg-border group-hover/dot:bg-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

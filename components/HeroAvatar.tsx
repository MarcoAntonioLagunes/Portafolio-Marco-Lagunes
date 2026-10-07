import Image from "next/image";
import { cn } from "@/lib/utils";

const TICKS = 72;

/** Anillo de rumbos (como el bisel de un compás): una marca cada 5°, más larga cada 45°. */
function BearingRing() {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -inset-5 h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)] text-accent">
      <circle cx="100" cy="100" r="99" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.5" />
      {Array.from({ length: TICKS }, (_, i) => {
        const major = i % 9 === 0;
        return (
          <line
            key={i}
            x1="100"
            y1="1.5"
            x2="100"
            y2={major ? 8 : 4.5}
            stroke="currentColor"
            strokeOpacity={major ? 0.9 : 0.35}
            strokeWidth={major ? 0.9 : 0.5}
            transform={`rotate(${(i * 360) / TICKS} 100 100)`}
          />
        );
      })}
    </svg>
  );
}

/** Foto del hero. Pulsos de sonar solo CSS, desactivados con reduced-motion en globals.css. */
export function HeroAvatar({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  return (
    <div className={cn("relative aspect-square animate-rise", className)}>
      <span aria-hidden="true" className="sonar-ping" />
      <span aria-hidden="true" className="sonar-ping [animation-delay:2.4s]" />
      <BearingRing />

      <div className="absolute inset-0 overflow-hidden rounded-full border border-accent/40 bg-navy shadow-[0_0_80px_-20px_hsl(var(--sonar)/0.45)]">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 768px) 144px, 288px"
            className="object-cover object-[center_20%]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-4xl text-accent">ML</div>
        )}
      </div>
    </div>
  );
}

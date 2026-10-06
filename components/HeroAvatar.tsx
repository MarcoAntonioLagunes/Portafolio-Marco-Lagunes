import Image from "next/image";

/** Foto del hero. Animaciones solo CSS (anillos y entrada), desactivadas con reduced-motion en globals.css. */
export function HeroAvatar({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="relative h-56 w-56 animate-fade-in-up sm:h-64 sm:w-64">
      <div aria-hidden="true" className="avatar-ring-dotted absolute -inset-3 rounded-full" />
      <div aria-hidden="true" className="avatar-ring-conic absolute -inset-1.5 rounded-full p-[3px]">
        <div className="h-full w-full rounded-full bg-background" />
      </div>

      <div className="absolute inset-0 overflow-hidden rounded-full border border-border shadow-2xl">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 640px) 224px, 256px"
            className="object-cover object-[center_20%]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-navy font-mono text-4xl text-accent">ML</div>
        )}
      </div>
    </div>
  );
}

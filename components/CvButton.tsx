import { Download } from "lucide-react";
import type { Profile } from "@/content/types";
import { cn } from "@/lib/utils";

/** Botón de descarga del CV del idioma activo. Si el PDF aún no existe, se muestra deshabilitado con aviso. */
export function CvButton({ profile, className }: { profile: Profile; className?: string }) {
  const { cv, hero, ui } = profile;
  if (!cv.available) {
    return (
      <span aria-disabled="true" className={cn(className, "cursor-not-allowed opacity-60")}>
        <Download aria-hidden="true" className="h-4 w-4 text-accent" /> {hero.ctas.cv}
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">({ui.contact.cvUnavailable})</span>
      </span>
    );
  }
  return (
    <a href={cv.href} download={cv.fileName} data-event="download_cv" className={className}>
      <Download aria-hidden="true" className="h-4 w-4 text-accent" /> {hero.ctas.cv}
    </a>
  );
}

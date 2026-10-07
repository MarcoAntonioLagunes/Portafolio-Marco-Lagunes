"use client";

import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { LOCALE_COOKIE, translatePath, type Locale } from "@/content/locales";

/**
 * Cambia al mismo contenido en el otro idioma (home ↔ home, caso ↔ caso) conservando el #ancla.
 * Guarda la elección en una cookie para que el proxy la respete sobre Accept-Language.
 */
export function LanguageToggle({ current, target, label }: { current: Locale; target: Locale; label: string }) {
  const pathname = usePathname();
  const href = translatePath(pathname || `/${current}`, target);

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={label}
      data-event="change_language"
      data-event-to={target}
      onClick={(e) => {
        document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
        if (window.location.hash) {
          e.preventDefault();
          window.location.href = `${href}${window.location.hash}`;
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Languages aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
      <span aria-hidden="true">{target}</span>
    </a>
  );
}

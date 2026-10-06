"use client";

import { useEffect } from "react";
import Script from "next/script";
import type { Locale } from "@/content/locales";
import { track, UMAMI_SCRIPT_SRC, UMAMI_WEBSITE_ID } from "@/lib/analytics";

/**
 * Carga Umami (sin cookies) solo si NEXT_PUBLIC_UMAMI_WEBSITE_ID está definido, y envía como evento
 * cualquier clic en un elemento con `data-event="nombre"`. Los atributos `data-event-*` se envían
 * como propiedades (p. ej. data-event-to="en"). Así los componentes de servidor declaran eventos sin JS propio.
 */
export function Analytics({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (!UMAMI_WEBSITE_ID) return;
    const handleClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-event]");
      if (!el?.dataset.event) return;
      const props: Record<string, string> = { locale };
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key.startsWith("event") && key !== "event" && value) props[key.slice(5).toLowerCase()] = value;
      }
      track(el.dataset.event, props);
    };
    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [locale]);

  if (!UMAMI_WEBSITE_ID) return null;
  return <Script src={UMAMI_SCRIPT_SRC} data-website-id={UMAMI_WEBSITE_ID} strategy="lazyOnload" />;
}

/** Registra la visita a un caso de estudio (se monta en esa página). */
export function TrackCaseStudyView({ slug, locale }: { slug: string; locale: Locale }) {
  useEffect(() => {
    // lazyOnload: si Umami aún no cargó, reintenta brevemente.
    let tries = 0;
    const id = window.setInterval(() => {
      if (window.umami || ++tries > 20) {
        window.clearInterval(id);
        track("case_study_view", { slug, locale });
      }
    }, 500);
    return () => window.clearInterval(id);
  }, [slug, locale]);
  return null;
}

/**
 * Capa de analytics independiente del proveedor. Hoy: Umami (sin cookies).
 * Para cambiar a Plausible u otro, solo se modifica `track` y el script en components/Analytics.tsx.
 *
 * Eventos del sitio:
 *  download_cv · click_linkedin · click_github · click_whatsapp · click_email · click_phone ·
 *  click_project_demo · contact_form_submit · case_study_view · change_language
 */
export type AnalyticsEvent =
  | "download_cv"
  | "click_linkedin"
  | "click_github"
  | "click_whatsapp"
  | "click_email"
  | "click_phone"
  | "click_project_demo"
  | "contact_form_submit"
  | "case_study_view"
  | "change_language";

type Props = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Props) => void };
  }
}

export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
export const UMAMI_SCRIPT_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC ?? "https://cloud.umami.is/script.js";

/** Envía un evento. No hace nada si el script no cargó (sin ID configurado, bloqueador, etc.). */
export function track(event: AnalyticsEvent | string, data?: Props) {
  try {
    window.umami?.track(event, data);
  } catch {
    // Analytics nunca debe romper la página.
  }
}

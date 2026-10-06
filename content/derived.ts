/** Años completos transcurridos desde una fecha "AAAA-MM" hasta la fecha del build. */
export function fullYearsSince(yearMonth: string, now = new Date()): number {
  const [year, month] = yearMonth.split("-").map(Number);
  const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  return Math.max(0, Math.floor(months / 12));
}

/** Inicio del liderazgo de equipos (Entrenador en McDonald's). Fuente de la métrica del hero. */
export const LEADERSHIP_SINCE = "2023-11";

export const PLACEHOLDER_RE = /\[COMPLETAR:[^\]]*\]/;

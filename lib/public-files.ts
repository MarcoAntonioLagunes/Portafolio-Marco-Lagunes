/** true si `href` (p. ej. "/Marco_Lagunes_CV.pdf") existía en public/ al momento del build. Ver next.config.ts. */
export function publicFileExists(href: string): boolean {
  return (process.env.PUBLIC_FILES ?? "").split("|").includes(href);
}

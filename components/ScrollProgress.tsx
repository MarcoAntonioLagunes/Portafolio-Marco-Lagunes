/**
 * Barra de progreso de lectura, solo CSS (animation-timeline: scroll()). Sin JS.
 * En navegadores sin soporte simplemente no se muestra (ver .scroll-progress en globals.css).
 */
export function ScrollProgress() {
  return <div aria-hidden="true" className="scroll-progress fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent to-beacon print:hidden" />;
}

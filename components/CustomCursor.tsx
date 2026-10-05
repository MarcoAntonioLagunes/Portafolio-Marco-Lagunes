"use client";

import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR =
  "a, button, [role='button'], input, textarea, select, summary, label, [data-cursor-hover]";
const RING_LERP = 0.18;
const SETTLE_DISTANCE = 0.1;

/**
 * Cursor decorativo para mouse. Desactivado en dispositivos táctiles / sin hover y con
 * prefers-reduced-motion. No re-renderiza React al mover el mouse: escribe estilos directo
 * en el DOM y el loop rAF solo corre mientras el anillo no ha alcanzado al puntero.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!enabled || !dot || !ring) return;

    document.body.classList.add("custom-cursor-active");
    const pos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let frame: number | null = null;

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * RING_LERP;
      ringPos.y += (pos.y - ringPos.y) * RING_LERP;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      const settled =
        Math.abs(pos.x - ringPos.x) < SETTLE_DISTANCE && Math.abs(pos.y - ringPos.y) < SETTLE_DISTANCE;
      frame = settled ? null : requestAnimationFrame(tick);
    };

    const handleMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      if (!document.body.dataset.cursorVisible) {
        document.body.dataset.cursorVisible = "1";
        ringPos.x = pos.x;
        ringPos.y = pos.y;
      }
      if (frame === null) frame = requestAnimationFrame(tick);
    };
    const handleOver = (e: MouseEvent) => {
      const hovering = !!(e.target as HTMLElement | null)?.closest?.(HOVER_SELECTOR);
      ring.classList.toggle("is-hovering", hovering);
    };
    const handleLeave = () => {
      delete document.body.dataset.cursorVisible;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      delete document.body.dataset.cursorVisible;
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} aria-hidden="true" className="custom-cursor-dot" />
      <div ref={ringRef} aria-hidden="true" className="custom-cursor-ring" />
    </>
  );
}

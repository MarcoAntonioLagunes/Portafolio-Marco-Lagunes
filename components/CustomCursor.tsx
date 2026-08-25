"use client";

import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR =
  "a, button, [role='button'], input, textarea, select, summary, label, [data-cursor-hover]";
const RING_LERP = 0.18;

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-active");

    const handleMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.(HOVER_SELECTOR)) setHovering(true);
    };
    const handleOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.(HOVER_SELECTOR)) setHovering(false);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);

    const tick = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * RING_LERP;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * RING_LERP;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <style jsx global>{`
        body.custom-cursor-active,
        body.custom-cursor-active * {
          cursor: none !important;
        }
      `}</style>

      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[#7C6FE0] transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0, willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-[#7C6FE0] transition-[width,height,opacity] duration-200 ease-out"
        style={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          opacity: visible ? (hovering ? 0.35 : 0.18) : 0,
          boxShadow: "0 0 24px 6px rgba(124, 111, 224, 0.45)",
          willChange: "transform, width, height, opacity",
        }}
      />
    </>
  );
}

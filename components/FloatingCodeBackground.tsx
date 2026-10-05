"use client";

import { useEffect, useRef, useState } from "react";

type FloatingCodeBackgroundProps = { density?: "low" | "medium" | "high"; opacity?: "subtle" | "soft"; variant?: "hero" | "projects" | "contact"; className?: string };

const snippets = {
  hero: ["const stack = ['React', 'Next.js']", "await api.authenticate()", "type User = { secure: true }", "database.connect('MongoDB')", "export default function App()", "jwt.verify(token)", "cloud.deploy({ region: 'global' })", "async function build() {}"],
  projects: ["<Component />", "REST API /v1/projects", "const response = await fetch()", "MongoDB.collection('apps')", "authentication: 'JWT'", "type AIResult = Success", "node server.ts", "cloud.sync()"],
  contact: ["const contact = async () =>", "await send(message)", "POST /api/contact", "response.ok", "email: 'hello@'", "message.deliver()"],
};
const densityCount = { low: 6, medium: 9, high: 13 };

/**
 * Fondo decorativo de fragmentos de código.
 * - Lazy: los fragmentos se montan cuando la sección se acerca al viewport y el navegador está ocioso.
 * - Se pausa fuera de pantalla (data-paused) y no anima con prefers-reduced-motion (globals.css).
 * - El texto va en ::before (attr data-code): es decoración pura, fuera del árbol de accesibilidad.
 */
export function FloatingCodeBackground({ density = "medium", opacity = "soft", variant = "hero", className = "" }: FloatingCodeBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let idleId: number | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && idleId === undefined) {
        const schedule = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
        idleId = schedule(() => setMounted(true));
      }
    }, { rootMargin: "200px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = mounted ? Array.from({ length: densityCount[density] }, (_, index) => snippets[variant][index % snippets[variant].length]) : [];
  return <div ref={ref} aria-hidden="true" data-paused={inView ? undefined : ""} className={`floating-code-layer pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}>{items.map((snippet, index) => <span key={`${snippet}-${index}`} data-code={snippet} className={`floating-code floating-code-${opacity}`} style={{ left: `${(index * 37 + 9) % 104 - 8}%`, top: `${(index * 29 + 6) % 96}%`, animationDelay: `${-index * 2.4}s`, animationDuration: `${19 + (index % 5) * 4}s`, fontSize: `${0.65 + (index % 3) * 0.09}rem` }} />)}</div>;
}

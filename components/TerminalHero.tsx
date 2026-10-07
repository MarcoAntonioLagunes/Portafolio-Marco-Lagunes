"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { TerminalLine } from "@/content/types";

const TYPE_SPEED_MS = 45;
const PAUSE_BEFORE_RESPONSE_MS = 1200;
const PAUSE_BEFORE_NEXT_MS = 2000;

function Cursor() {
  return <span className="inline-block animate-blink text-accent">_</span>;
}

/**
 * Terminal decorativa (aria-hidden: todo su contenido existe en el resto de la página).
 * El tecleo se pausa cuando la terminal sale del viewport; con reduced-motion se muestra estática.
 */
export function TerminalHero({ lines, title }: { lines: TerminalLine[]; title: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(true);
  const [done, setDone] = useState<TerminalLine[]>([]);
  const [currentCmd, setCurrentCmd] = useState("");
  const [currentResp, setCurrentResp] = useState("");
  const [phase, setPhase] = useState<"cmd" | "resp">("cmd");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
    // Espera mientras la terminal no está en pantalla, sin re-renderizar.
    const waitVisible = async () => {
      while (!cancelled && !visibleRef.current) await wait(400);
    };
    const type = async (text: string, set: (value: string) => void) => {
      for (let i = 1; i <= text.length; i++) {
        await waitVisible();
        if (cancelled) return;
        set(text.slice(0, i));
        await wait(TYPE_SPEED_MS);
      }
    };

    async function run() {
      while (!cancelled) {
        for (const line of lines) {
          setPhase("cmd");
          setCurrentCmd("");
          setCurrentResp("");
          await type(line.cmd, setCurrentCmd);
          await wait(PAUSE_BEFORE_RESPONSE_MS);
          if (cancelled) return;
          setPhase("resp");
          await type(line.resp, setCurrentResp);
          if (cancelled) return;
          setDone((prev) => [...prev, line]);
          setCurrentCmd("");
          setCurrentResp("");
          await wait(PAUSE_BEFORE_NEXT_MS);
          if (cancelled) return;
        }
        setDone([]);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [reduced, lines]);

  const shown = reduced ? lines : done;

  return (
    <div ref={ref} aria-hidden="true" className="w-full max-w-md overflow-hidden rounded-lg border border-border bg-card/85 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-1.5 border-b border-border bg-background/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 truncate font-mono text-[11px] text-muted-foreground">{title}</span>
      </div>

      <div className="min-h-[230px] px-4 py-4 font-mono text-[13px] leading-relaxed">
        {shown.map((line, i) => (
          <div key={i} className="mb-2.5">
            <p className="text-foreground">
              <span className="text-accent">$</span> {line.cmd}
            </p>
            <p className="whitespace-pre-wrap text-sonar">{line.resp}</p>
          </div>
        ))}

        {!reduced && (
          <div className="mb-2.5">
            <p className="text-foreground">
              <span className="text-accent">$</span> {currentCmd}
              {phase === "cmd" && <Cursor />}
            </p>
            {phase === "resp" && (
              <p className="whitespace-pre-wrap text-sonar">
                {currentResp}
                <Cursor />
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

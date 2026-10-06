"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const SESSION_KEY = "ml_boot_seen";
const MUTE_KEY = "ml_boot_muted";

type Phase = "hidden" | "visible" | "leaving";

/**
 * Pantalla de arranque en la primera visita de la sesión (?boot=1 la fuerza). Animaciones solo CSS
 * (.boot-progress / .boot-leaving en globals.css); con reduced-motion la barra se completa al instante.
 * `soundSrc` solo se pasa si el archivo existe en public/ (lo resuelve el layout en el build).
 */
export function BootIntro({ soundSrc, strings }: { soundSrc?: string; strings: { skip: string; soundOn: string; soundOff: string } }) {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sincroniza con sessionStorage/localStorage al montar. No puede ir en el estado inicial:
  // el servidor no tiene storage y el primer render del cliente debe coincidir con el SSR.
  useEffect(() => {
    let seen = false;
    let storedMuted = false;
    const forceReplay = new URLSearchParams(window.location.search).get("boot") === "1";
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
      if (forceReplay || !seen) sessionStorage.setItem(SESSION_KEY, "1");
      storedMuted = localStorage.getItem(MUTE_KEY) === "1";
    } catch {
      // Storage bloqueado (modo privado estricto): se muestra el intro sin recordar la preferencia.
    }
    if (forceReplay || !seen) {
      /* eslint-disable react-hooks/set-state-in-effect -- estado derivado de storage externo, solo en el montaje */
      setMuted(storedMuted);
      setPhase("visible");
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, []);

  useEffect(() => {
    if (phase !== "visible") return;
    document.body.style.overflow = "hidden";
    // Cualquier tecla omite el intro. preventDefault evita que Espacio/flechas desplacen la página debajo.
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      setPhase("leaving");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "visible" || muted || !soundSrc) return;
    audioRef.current?.play().catch(() => {
      // Autoplay bloqueado por el navegador: se omite en silencio.
    });
  }, [phase, muted, soundSrc]);

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(MUTE_KEY, next ? "1" : "0");
      } catch {
        // Sin storage: la preferencia dura solo esta visita.
      }
      return next;
    });
  };

  if (phase === "hidden") return null;

  return (
    <div
      role="presentation"
      onClick={() => setPhase("leaving")}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && phase === "leaving") setPhase("hidden");
      }}
      className={cn("boot-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background", phase === "leaving" && "boot-leaving")}
    >
      {soundSrc && (
        <button
          type="button"
          aria-label={muted ? strings.soundOn : strings.soundOff}
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {muted ? <VolumeX aria-hidden="true" className="h-4 w-4" /> : <Volume2 aria-hidden="true" className="h-4 w-4" />}
        </button>
      )}

      <div className="boot-logo">
        <Logo className="h-16 w-16" />
      </div>

      <div className="h-[3px] w-40 overflow-hidden rounded-full bg-muted">
        <div className="boot-progress h-full w-full origin-left bg-accent" onAnimationEnd={() => setPhase("leaving")} />
      </div>

      <p className="font-mono text-xs tracking-widest text-muted-foreground">{strings.skip}</p>

      {soundSrc && <audio ref={audioRef} src={soundSrc} preload="auto" muted={muted} />}
    </div>
  );
}

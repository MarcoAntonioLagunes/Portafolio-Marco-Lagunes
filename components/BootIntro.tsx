"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useBooted } from "@/lib/boot-context";

const SESSION_KEY = "ml_boot_seen";
const MUTE_KEY = "ml_boot_muted";
const BOOT_DURATION = 1.7;

/** `soundSrc` solo se pasa si el archivo existe en public/ (lo verifica el layout en el servidor). */
export function BootIntro({ soundSrc }: { soundSrc?: string }) {
  const { setBooted } = useBooted();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progressDone, setProgressDone] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const finishedRef = useRef(false);

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
      setVisible(true);
      /* eslint-enable react-hooks/set-state-in-effect */
    } else {
      setBooted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || muted || !soundSrc) return;
    audioRef.current?.play().catch(() => {
      // Autoplay bloqueado por el navegador: se omite en silencio.
    });
  }, [visible, muted, soundSrc]);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default so keys with native scroll behavior (Space, arrows, Page Down)
      // don't jump-scroll the page underneath while it's being dismissed.
      e.preventDefault();
      finish();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible]);

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

  return (
    <AnimatePresence onExitComplete={() => setBooted(true)}>
      {visible && (
        <motion.div
          key="boot-intro"
          role="presentation"
          onClick={finish}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background"
          initial={false}
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.08, filter: "blur(14px)" }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {soundSrc && (
          <button
            type="button"
            aria-label={muted ? "Activar sonido de inicio" : "Silenciar sonido de inicio"}
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Logo className="h-16 w-16" />
          </motion.div>

          <div className="h-[3px] w-40 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full w-full origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: BOOT_DURATION, ease: "easeInOut" }
              }
              onAnimationComplete={() => {
                if (!progressDone) {
                  setProgressDone(true);
                  finish();
                }
              }}
            />
          </div>

          <p className="font-mono text-xs tracking-widest text-muted-foreground">
            presiona cualquier tecla para omitir
          </p>

          {soundSrc && <audio ref={audioRef} src={soundSrc} preload="auto" muted={muted} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

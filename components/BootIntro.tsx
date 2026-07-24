"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useBooted } from "@/lib/boot-context";

const SESSION_KEY = "ml_boot_seen";
const MUTE_KEY = "ml_boot_muted";
const BOOT_DURATION = 1.7;

export function BootIntro() {
  const { setBooted } = useBooted();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progressDone, setProgressDone] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    const forceReplay = new URLSearchParams(window.location.search).get("boot") === "1";
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (forceReplay || !seen) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setMuted(localStorage.getItem(MUTE_KEY) === "1");
      setVisible(true);
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
    if (!visible || muted) return;
    audioRef.current?.play().catch(() => {
      // Autoplay bloqueado por el navegador: se omite en silencio.
    });
  }, [visible, muted]);

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
      localStorage.setItem(MUTE_KEY, next ? "1" : "0");
      return next;
    });
  };

  if (!visible) return null;

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

          <audio ref={audioRef} src="/sounds/boot.mp3" preload="auto" muted={muted} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

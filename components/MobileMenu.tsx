"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { NavLink } from "@/content/types";
import { cn } from "@/lib/utils";

export function MobileMenu({
  open,
  links,
  activeId,
  closeLabel,
  onClose,
}: {
  open: boolean;
  links: NavLink[];
  activeId?: string;
  closeLabel: string;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape cierra; el foco entra al panel y se mantiene dentro mientras está abierto.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("button, a")?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panel) return;
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>("button, a"));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            onClick={onClose}
          />
          <motion.div
            key="panel"
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col gap-1 border-l border-border bg-card px-6 py-24 lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: reduced ? 0 : 0.35, ease: "easeInOut" }}
          >
            <button
              type="button"
              aria-label={closeLabel}
              onClick={onClose}
              className="absolute right-5 top-6 rounded-full p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
            {links.map((link) => {
              const isActive = activeId === link.href.split("#")[1];
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative w-fit rounded-md px-3 py-3 font-mono text-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

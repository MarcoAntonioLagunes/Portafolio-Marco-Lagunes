"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { NavLink } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Panel lateral del menú móvil. Siempre montado: cerrado queda fuera de pantalla e `inert`
 * (sin foco ni lectura), así la transición de entrada/salida es solo CSS.
 */
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
    <div className="lg:hidden">
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-72 flex-col gap-1 border-l border-border bg-card px-6 py-24 transition-transform duration-300 ease-in-out motion-reduce:transition-none",
          open ? "translate-x-0" : "translate-x-full",
        )}
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
      </div>
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

export function MobileMenu({
  open,
  links,
  activeId,
  onClose,
}: {
  open: boolean;
  links: NavLink[];
  activeId?: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            key="panel"
            className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col gap-1 border-l border-border bg-card px-6 py-24 md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={onClose}
              className="absolute right-5 top-6 rounded-full p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-5 w-5" />
            </button>
            {links.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "relative w-fit rounded-md px-3 py-3 font-mono text-sm transition-colors hover:bg-muted hover:text-foreground",
                    isActive ? "text-foreground" : "text-muted-foreground",
                    "after:absolute after:bottom-2 after:left-3 after:h-px after:w-[calc(100%-1.5rem)] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300",
                    isActive ? "after:scale-x-100" : "hover:after:scale-x-100",
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

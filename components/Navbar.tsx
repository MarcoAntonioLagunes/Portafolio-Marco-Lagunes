"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Menu } from "lucide-react";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import type { NavLink } from "@/content/types";
import { cn } from "@/lib/utils";

export interface NavbarStrings {
  openMenu: string;
  closeMenu: string;
  goHome: string;
}

export function Navbar({
  links,
  strings,
  homePath = "/",
  actions,
}: {
  links: NavLink[];
  strings: NavbarStrings;
  /** Ruta del home. Fuera del home, las anclas se prefijan con ella (p. ej. "/#proyectos"). */
  homePath?: string;
  /** Controles extra a la derecha (p. ej. selector de idioma), renderizados en el servidor. */
  actions?: React.ReactNode;
}) {
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isHome = pathname === homePath || pathname === `${homePath}/`;
  const resolvedLinks = isHome ? links : links.map((link) => ({ ...link, href: `${homePath}${link.href}` }));

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    if (!isHome || sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <a href={isHome ? "#top" : homePath} className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={strings.goHome}>
          <Logo className="h-8 w-8" decorative />
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {resolvedLinks.map((link) => {
            const id = link.href.split("#")[1];
            const isActive = activeId === id;
            return (
              <li key={link.href} className="relative py-2">
                <a
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative rounded-sm font-mono text-xs uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-accent"
                    transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {actions}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={strings.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
            className="rounded-md p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} links={resolvedLinks} activeId={activeId} closeLabel={strings.closeMenu} onClose={closeMenu} />
    </header>
  );
}

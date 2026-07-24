"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu } from "lucide-react";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Certificaciones", href: "#certificaciones" },
  { label: "Educación", href: "#educacion" },
  { label: "Stack", href: "#stack" },
  { label: "Fortalezas", href: "#fortalezas" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("sobre-mi");

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2" aria-label="Ir al inicio">
          <Logo className="h-8 w-8" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <li key={link.href} className="relative py-2">
                <a
                  href={link.href}
                  className={cn(
                    "relative font-mono text-xs uppercase tracking-widest transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300",
                    !isActive && "hover:after:scale-x-100",
                  )}
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(true)}
          className="rounded-md p-2 text-foreground md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      <MobileMenu
        open={menuOpen}
        links={NAV_LINKS}
        activeId={activeId}
        onClose={() => setMenuOpen(false)}
      />
    </motion.header>
  );
}

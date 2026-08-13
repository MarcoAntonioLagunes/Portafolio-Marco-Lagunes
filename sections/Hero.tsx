import fs from "node:fs";
import path from "node:path";
import { heroStats, socialLinks } from "@/lib/data";
import { HeroAvatar } from "@/components/HeroAvatar";
import { ScrollCue } from "@/components/ScrollCue";
import { SocialIcon } from "@/components/SocialIcon";
import { StatCounter } from "@/components/StatCounter";
import { TerminalName } from "@/components/TerminalName";
import { TypewriterText } from "@/components/TypewriterText";

function hasAvatar() {
  return fs.existsSync(
    path.join(process.cwd(), "public", "images", "image.png")
  );
}

export function Hero() {
  const avatarExists = hasAvatar();

  return (
    <section
      id="sobre-mi"
      className="relative flex min-h-screen flex-col overflow-hidden pb-12 pt-24 md:pb-64"
    >
      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute inset-0 bg-grid-glow" />

      {/* Blobs de luz difusa */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-blob -left-24 -top-16 h-72 w-72 animate-blob-drift bg-accent/25 sm:h-96 sm:w-96" />
        <div className="hero-blob -right-32 top-1/3 h-64 w-64 animate-blob-drift-slow bg-mint/15 sm:h-80 sm:w-80" />
        <div className="hero-blob bottom-[-6rem] left-1/4 h-56 w-56 animate-blob-drift bg-lavender/15" />
      </div>

      {/* Contenido principal */}
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-20 md:py-16">
        {/* Información */}
        <div className="flex animate-fade-in-up flex-col items-center text-center md:items-start md:text-left">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Desarrollador Full-Stack
          </p>

          <TerminalName
            text="Marco Lagunes"
            className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl"
          />

          <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Arquitectura de Software · Aplicaciones Web · Ciberseguridad
            Aplicada
          </p>

          <TypewriterText
            text="Construyendo software seguro y listo para producción, de principio a fin."
            className="mt-6 max-w-xl text-lg font-medium text-foreground sm:text-xl"
          />

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Ingeniero en Sistemas Computacionales y desarrollador full-stack
            certificado en Cisco CCST Cybersecurity. Diseño y despliego
            aplicaciones web completas — frontend, backend, bases de datos,
            APIs y autenticación — con foco en seguridad desde el diseño.
            Actualmente construyo una plataforma de misión crítica en uso por
            una asociación nacional de oficiales de marina mercante.
          </p>

          {/* Botones */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a
              href="#proyectos"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-all duration-300 hover:scale-[1.04] hover:bg-accent/90 hover:shadow-[0_0_24px_-2px_hsl(var(--accent)/0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
            >
              Ver proyectos
            </a>

            <a
              href="#contacto"
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:scale-[1.04] hover:border-accent hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
            >
              Contactarme
            </a>
          </div>

          {/* Redes sociales */}
          <div className="mt-8 flex items-center justify-center gap-5 md:justify-start">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-label={link.label}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="rounded-sm text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <SocialIcon icon={link.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Fotografía */}
        <div className="flex justify-center md:justify-end">
          <HeroAvatar avatarExists={avatarExists} />
        </div>
      </div>

      {/* Indicador de desplazamiento */}
      <ScrollCue className="absolute inset-x-0 bottom-48 hidden text-center md:block" />

      {/* Estadísticas */}
      <div className="relative mt-12 border-y border-border bg-surface2/70 py-2 backdrop-blur-sm md:absolute md:inset-x-0 md:bottom-0 md:mt-0">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 px-6 sm:grid-cols-4">
          {heroStats.map((stat, index) => (
            <div
              key={stat.label}
              className={
                index % 2 === 1
                  ? "border-l border-border"
                  : index === 2
                    ? "sm:border-l sm:border-border"
                    : undefined
              }
            >
              <StatCounter value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
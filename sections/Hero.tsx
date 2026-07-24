import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { heroStats, socialLinks } from "@/lib/data";
import { ScrollCue } from "@/components/ScrollCue";
import { SocialIcon } from "@/components/SocialIcon";
import { StatCounter } from "@/components/StatCounter";
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

      {/* Contenido principal */}
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-20 md:py-16">
        {/* Información */}
        <div className="flex animate-fade-in-up flex-col items-center text-center md:items-start md:text-left">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Desarrollador Full-Stack
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Marco Lagunes
          </h1>

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
          {avatarExists ? (
            <div className="relative h-56 w-56 overflow-hidden rounded-full border border-border shadow-2xl sm:h-64 sm:w-64">
              <Image
                src="/images/image.png"
                alt="Marco Lagunes, desarrollador Full-Stack"
                fill
                priority
                sizes="(max-width: 640px) 224px, 256px"
                className="object-cover object-[center_20%]"
              />
            </div>
          ) : (
            <div className="flex h-56 w-56 items-center justify-center rounded-full border border-border bg-navy font-mono text-4xl text-accent sm:h-64 sm:w-64">
              ML
            </div>
          )}
        </div>
      </div>

      {/* Indicador de desplazamiento */}
      <ScrollCue className="absolute inset-x-0 bottom-48 hidden text-center md:block" />

      {/* Estadísticas */}
      <div className="relative mx-auto mt-12 grid w-full max-w-5xl grid-cols-2 gap-4 px-6 sm:grid-cols-4 md:absolute md:inset-x-0 md:bottom-8 md:mt-0">
        {heroStats.map((stat) => (
          <StatCounter
            key={stat.label}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
}
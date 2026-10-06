import { CvButton } from "@/components/CvButton";
import { HeroAvatar } from "@/components/HeroAvatar";
import { ScrollCue } from "@/components/ScrollCue";
import { SocialIcon } from "@/components/SocialIcon";
import { StatCounter } from "@/components/StatCounter";
import { TerminalHero } from "@/components/TerminalHero";
import { TerminalName } from "@/components/TerminalName";
import { TypewriterText } from "@/components/TypewriterText";
import { FloatingCodeBackground } from "@/components/FloatingCodeBackground";
import type { Profile } from "@/content/types";
import { publicFileExists } from "@/lib/public-files";

const AVATAR_SRC = "/images/image.png";

const secondaryButton =
  "flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:scale-[1.04] hover:border-accent hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] motion-reduce:hover:scale-100";

export function Hero({ profile }: { profile: Profile }) {
  const { person, hero, metrics, socials } = profile;

  return (
    <section id="sobre-mi" className="relative isolate flex min-h-screen flex-col overflow-hidden pb-12 pt-24 md:pb-64">
      {/* Fondo decorativo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-glow" />
      <FloatingCodeBackground density="high" variant="hero" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-blob -left-24 -top-16 h-72 w-72 animate-blob-drift bg-accent/25 sm:h-96 sm:w-96" />
        <div className="hero-blob -right-32 top-1/3 h-64 w-64 animate-blob-drift-slow bg-mint/15 sm:h-80 sm:w-80" />
        <div className="hero-blob bottom-[-6rem] left-1/4 h-56 w-56 animate-blob-drift bg-lavender/15" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-20 md:py-16">
        <div className="flex animate-fade-in-up flex-col items-center text-center md:items-start md:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-mint">
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60 [animation-duration:2.4s] motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            {hero.badge}
          </p>

          <TerminalName text={person.name} className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl" />

          <p className="mt-3 max-w-xl font-mono text-xs uppercase tracking-widest text-accent sm:text-sm">{hero.subtitle}</p>

          <TypewriterText text={hero.headline} className="mt-6 max-w-xl text-lg font-medium text-foreground sm:text-xl" />

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">{hero.summary}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a
              href="#proyectos"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-all duration-300 hover:scale-[1.04] hover:bg-accent/90 hover:shadow-[0_0_24px_-2px_hsl(var(--accent)/0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] motion-reduce:hover:scale-100"
            >
              {hero.ctas.projects}
            </a>
            <CvButton profile={profile} className={secondaryButton} />
            <a href="#contacto" className={secondaryButton}>
              {hero.ctas.contact}
            </a>
          </div>

          <ul className="mt-8 flex items-center justify-center gap-3 md:justify-start">
            {socials.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-label={link.label}
                    data-event={link.event}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <SocialIcon icon={link.icon} className="h-5 w-5" />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex w-full justify-center md:justify-start">
            <TerminalHero lines={hero.terminal} title={hero.terminalTitle} />
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <HeroAvatar src={publicFileExists(AVATAR_SRC) ? AVATAR_SRC : undefined} alt={hero.avatarAlt} />
        </div>
      </div>

      <ScrollCue label={hero.scrollCue} className="absolute inset-x-0 bottom-48 hidden text-center md:block" />

      <div className="relative z-10 mt-12 border-y border-border bg-surface2/70 py-2 backdrop-blur-sm md:absolute md:inset-x-0 md:bottom-0 md:mt-0">
        <ul className="mx-auto grid w-full max-w-4xl grid-cols-3 divide-x divide-border px-6">
          {metrics.map((stat) => (
            <li key={stat.label}>
              <StatCounter value={stat.value} label={stat.label} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

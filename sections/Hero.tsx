import { CvButton } from "@/components/CvButton";
import { HeroAvatar } from "@/components/HeroAvatar";
import { SocialIcon } from "@/components/SocialIcon";
import { StatCounter } from "@/components/StatCounter";
import { TerminalHero } from "@/components/TerminalHero";
import { TerminalName } from "@/components/TerminalName";
import { TypewriterText } from "@/components/TypewriterText";
import type { Profile } from "@/content/types";
import { publicFileExists } from "@/lib/public-files";

const AVATAR_SRC = "/images/image.png";
/** Boca del Río, Veracruz. */
const COORDINATES = "19°06′N · 96°06′W";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const secondaryButton = `flex items-center gap-2 rounded-md border border-border bg-background/40 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-accent hover:text-accent ${focusRing}`;

export function Hero({ profile }: { profile: Profile }) {
  const { person, hero, metrics, socials } = profile;

  return (
    <section id="sobre-mi" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-center md:gap-12">
        <div className="animate-rise">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="inline-flex items-center gap-2 rounded-md border border-sonar/40 bg-sonar/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-sonar">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sonar opacity-60 [animation-duration:2.4s] motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sonar" />
              </span>
              {hero.badge}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span className="text-accent">⌖</span> {COORDINATES}
              <span className="hidden sm:inline"> · {person.location.split(",")[0]}</span>
            </p>
          </div>

          <TerminalName
            text={person.name}
            shineLastWord
            className="display mt-6 text-[clamp(4.5rem,15vw,9.5rem)] text-foreground [text-shadow:0_2px_40px_hsl(var(--background))]"
          />

          <p className="mt-6 flex max-w-xl items-start gap-3 font-mono text-xs uppercase leading-relaxed tracking-[0.18em] text-beacon">
            <span aria-hidden="true" className="mt-[0.55em] h-px w-8 shrink-0 bg-accent" />
            {hero.subtitle}
          </p>

          <TypewriterText text={hero.headline} className="mt-6 max-w-xl text-xl font-semibold leading-snug text-foreground sm:text-2xl" />

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{hero.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#proyectos"
              className={`rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-[background-color,box-shadow] duration-200 hover:bg-beacon hover:shadow-[0_0_32px_-6px_hsl(var(--accent)/0.7)] ${focusRing}`}
            >
              {hero.ctas.projects}
            </a>
            <CvButton profile={profile} className={secondaryButton} />
            <a href="#contacto" className={secondaryButton}>
              {hero.ctas.contact}
            </a>
            <ul className="flex items-center gap-1 sm:ml-2">
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
                      className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <SocialIcon icon={link.icon} className="h-5 w-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-border pt-6">
            {metrics.map((stat) => (
              <li key={stat.label}>
                <StatCounter value={stat.value} label={stat.label} />
              </li>
            ))}
          </ul>
        </div>

        <div className="order-first flex flex-col items-start md:order-none md:items-center">
          <HeroAvatar src={publicFileExists(AVATAR_SRC) ? AVATAR_SRC : undefined} alt={hero.avatarAlt} className="ml-5 mt-5 w-28 sm:w-36 md:ml-0 md:mt-0 md:w-64 lg:w-72" />
          <div className="mt-14 hidden w-full justify-center md:flex">
            <TerminalHero lines={hero.terminal} title={hero.terminalTitle} />
          </div>
        </div>
      </div>
    </section>
  );
}

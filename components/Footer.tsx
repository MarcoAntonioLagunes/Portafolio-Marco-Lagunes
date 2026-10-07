import { SocialIcon } from "@/components/SocialIcon";
import type { Profile } from "@/content/types";
import { SITE_HOST, SITE_URL } from "@/lib/site";

export function Footer({ profile }: { profile: Profile }) {
  const { person, socials, ui } = profile;
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden border-t border-border bg-background print:hidden">
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-4 pt-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{ui.footer.role}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            © {year} {person.name} · {person.location} ·{" "}
            <a href={SITE_URL} className="rounded-sm text-beacon transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {SITE_HOST}
            </a>
          </p>
        </div>

        <ul className="-ml-2 flex items-center gap-1 sm:ml-0">
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
                  className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <SocialIcon icon={link.icon} className="h-[18px] w-[18px]" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Nombre gigante en contorno, recorrido por un destello de faro (decorativo). */}
      <div aria-hidden="true" className="pointer-events-none -mb-[0.12em] select-none text-center">
        <span className="footer-sweep-name display whitespace-nowrap">{person.name}</span>
      </div>
    </footer>
  );
}

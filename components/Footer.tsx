import { SocialIcon } from "@/components/SocialIcon";
import type { Profile } from "@/content/types";
import { SITE_HOST, SITE_URL } from "@/lib/site";

export function Footer({ profile }: { profile: Profile }) {
  const { person, socials, ui } = profile;
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/5 bg-[#06090F] print:hidden">
      {/* Texto grande animado al fondo (decorativo) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex select-none items-center justify-center">
        <span className="footer-sweep-name whitespace-nowrap font-bold tracking-tight">{person.name}</span>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-1.5 px-6 pb-2 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-1 sm:pt-5 sm:text-left">
        <span className="text-sm font-semibold text-white">{person.name}</span>
        <span className="text-center text-xs text-white/70">
          © {year} {person.name} &nbsp;·&nbsp; {person.location} &nbsp;·&nbsp;
          <a href={SITE_URL} className="rounded-sm text-violet-300 transition-colors hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {SITE_HOST}
          </a>
        </span>
      </div>

      <div className="relative z-10 flex items-center justify-between px-8 pb-5 pt-10">
        <span className="font-mono text-xs text-white/60">{ui.footer.role}</span>

        <ul className="flex items-center gap-2">
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
                  className="flex h-9 w-9 items-center justify-center rounded-sm text-white/60 transition-colors duration-200 hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <SocialIcon icon={link.icon} className="h-[17px] w-[17px]" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}

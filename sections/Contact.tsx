import { Phone } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialIcon } from "@/components/SocialIcon";
import { ContactForm } from "@/components/ContactForm";
import { CvButton } from "@/components/CvButton";
import type { Profile } from "@/content/types";

const linkClass =
  "flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Contact({ profile }: { profile: Profile }) {
  const { socials, person, ui, locale } = profile;
  const contactLinks = socials.filter((s) => s.icon !== "github");

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="relative isolate scroll-mt-24 overflow-hidden border-t border-border bg-surface3/50 py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading id="contacto-title" {...ui.sections.contact} className="mb-6" />
        <p className="reveal mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">{ui.contact.intro}</p>

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
          <div className="reveal">
            <ContactForm t={ui.contact} locale={locale} />
          </div>

          <ul className="reveal flex flex-col gap-3 lg:w-64">
            {contactLinks.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-event={link.event}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={linkClass}
                  >
                    <SocialIcon icon={link.icon} className="h-4 w-4 text-accent" /> {link.label}
                  </a>
                </li>
              );
            })}
            <li>
              <a href={`tel:${person.phone}`} data-event="click_phone" className={linkClass}>
                <Phone aria-hidden="true" className="h-4 w-4 text-accent" /> {ui.contact.call}
              </a>
            </li>
            <li>
              <CvButton profile={profile} className={`${linkClass} bg-muted font-medium`} />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

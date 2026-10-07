import { Award, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { CertificationItem, Profile } from "@/content/types";

function CertCard({ cert }: { cert: CertificationItem }) {
  return (
    <li className="reveal flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_28px_-12px_hsl(var(--accent)/0.5)] motion-reduce:hover:translate-y-0">
      <div className="flex items-start justify-between gap-3">
        <Award aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />
        {cert.note && (
          <span className="rounded-md border border-border bg-muted px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {cert.note}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold leading-snug text-foreground">{cert.name}</h3>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {cert.issuer} · {cert.date}
        </p>
      </div>
    </li>
  );
}

/** Las 4 certificaciones destacadas siempre visibles; el resto en un <details> nativo (accesible y sin JS). */
export function Certifications({ profile }: { profile: Profile }) {
  const { certifications, ui } = profile;
  return (
    <section id="certificaciones" aria-labelledby="certificaciones-title" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="certificaciones-title" {...ui.sections.certifications} />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.featured.map((cert) => (
            <CertCard key={cert.name} cert={cert} />
          ))}
        </ul>

        {certifications.others.length > 0 && (
          <details className="group mt-6">
            <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-md border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">
                {ui.certifications.showAll} (+{certifications.others.length} {ui.certifications.more})
              </span>
              <span className="hidden group-open:inline">{ui.certifications.showLess}</span>
              <ChevronDown aria-hidden="true" className="h-4 w-4 text-accent transition-transform group-open:rotate-180" />
            </summary>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.others.map((cert) => (
                <CertCard key={cert.name} cert={cert} />
              ))}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
}

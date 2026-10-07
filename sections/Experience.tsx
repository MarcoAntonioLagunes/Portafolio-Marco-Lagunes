import { SectionHeading } from "@/components/SectionHeading";
import { TimelineItem } from "@/components/TimelineItem";
import type { Profile } from "@/content/types";

export function Experience({ profile }: { profile: Profile }) {
  const { experience, ui } = profile;
  return (
    <section id="experiencia" aria-labelledby="experiencia-title" className="relative isolate scroll-mt-24 overflow-hidden border-t border-border py-24">
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <SectionHeading id="experiencia-title" {...ui.sections.experience} />
        <ol>
          {experience.map((item, index) => (
            <TimelineItem key={`${item.organization}-${item.period}`} item={item} isLast={index === experience.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

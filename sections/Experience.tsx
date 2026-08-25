import { SectionHeading } from "@/components/SectionHeading";
import { TimelineItem } from "@/components/TimelineItem";
import { ParticleBackground } from "@/components/ParticleBackground";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experiencia" className="relative isolate scroll-mt-24 overflow-hidden border-t border-border py-24">
      <ParticleBackground density="medium" />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="experiencia" title="Trayectoria profesional" />

        <ul>
          {experience.map((item, index) => (
            <TimelineItem
              key={`${item.role}-${item.period}`}
              item={item}
              index={index}
              isLast={index === experience.length - 1}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

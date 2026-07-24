import { SectionHeading } from "@/components/SectionHeading";
import { TimelineItem } from "@/components/TimelineItem";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experiencia" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
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

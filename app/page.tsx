import { Hero } from "@/sections/Hero";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Education } from "@/sections/Education";
import { Now } from "@/sections/Now";
import { Certifications } from "@/sections/Certifications";
import { Skills } from "@/sections/Skills";
import { Strengths } from "@/sections/Strengths";
import { Contact } from "@/sections/Contact";
import { getProfile } from "@/content";

/** ISR: la sección "Ahora mismo" consulta GitHub; la página se regenera como máximo cada 24 h. */
export const revalidate = 86400;

export default function Home() {
  const profile = getProfile();
  return (
    <main id="top" className="flex-1">
      <Hero profile={profile} />
      <Experience profile={profile} />
      <Projects profile={profile} projectPath={(slug) => `/proyectos/${slug}`} />
      <Now profile={profile} />
      <Education profile={profile} />
      <Certifications profile={profile} />
      <Skills profile={profile} />
      <Strengths profile={profile} />
      <Contact profile={profile} />
    </main>
  );
}

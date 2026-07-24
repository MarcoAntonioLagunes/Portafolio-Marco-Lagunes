import { Hero } from "@/sections/Hero";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Certifications } from "@/sections/Certifications";
import { Education } from "@/sections/Education";
import { Skills } from "@/sections/Skills";
import { Strengths } from "@/sections/Strengths";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <Hero />
      <Experience />
      <Projects />
      <Certifications />
      <Education />
      <Skills />
      <Strengths />
      <Contact />
    </main>
  );
}

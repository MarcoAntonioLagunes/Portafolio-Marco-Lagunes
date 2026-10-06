import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/PrintButton";
import { WithPlaceholders } from "@/components/WithPlaceholders";
import { getProfile, isLocale, LOCALES, projectPath } from "@/content";
import { localeAlternates } from "@/lib/seo";
import { GITHUB_URL, LINKEDIN_URL, SITE_HOST, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const profile = getProfile(lang);
  return {
    title: `${profile.ui.cv.title} — ${profile.person.name}`,
    description: profile.meta.description,
    alternates: localeAlternates(lang, (l) => `/${l}/cv`),
  };
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2 mt-5 border-b border-neutral-300 pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-700">{children}</h2>;
}

/**
 * CV imprimible generado desde el perfil: una columna, texto lineal (compatible con ATS), links clicables.
 * Con Ctrl+P se ocultan navbar/footer/decoraciones (ver @media print en globals.css).
 */
export default async function CvPage({ params }: PageProps<"/[lang]/cv">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const p = getProfile(lang);
  const t = p.ui;
  const certs = [...p.certifications.featured, ...p.certifications.others];

  return (
    <main id="top" className="cv-page flex-1 px-4 pb-16 pt-24 print:p-0">
      <div className="no-print mx-auto mb-4 flex max-w-[8.5in] flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{t.cv.hint}</p>
        <PrintButton label={t.cv.print} />
      </div>

      <article className="cv-sheet mx-auto max-w-[8.5in] bg-white px-10 py-9 font-sans text-[12.5px] leading-snug text-neutral-900 shadow-2xl print:max-w-none print:px-0 print:py-0 print:shadow-none">
        <header>
          <h1 className="text-[26px] font-bold leading-tight text-neutral-950">{p.person.name}</h1>
          <p className="mt-0.5 text-[13.5px] font-semibold text-[#4b3fc4]">{p.hero.subtitle}</p>
          <p className="mt-1.5 text-neutral-700">
            {p.person.location} · <a href={`mailto:${p.person.email}`} className="underline">{p.person.email}</a> · <a href={`tel:${p.person.phone}`}>{p.person.phone}</a>
          </p>
          <p className="text-neutral-700">
            <a href={`${SITE_URL}/${lang}`} className="underline">{SITE_HOST}/{lang}</a> · <a href={LINKEDIN_URL} className="underline">{LINKEDIN_URL.replace("https://", "")}</a> · <a href={GITHUB_URL} className="underline">{GITHUB_URL.replace("https://", "")}</a>
          </p>
          <p className="mt-1 font-semibold text-neutral-800">{p.hero.badge}</p>
        </header>

        <H2>{t.cv.summary}</H2>
        <p className="text-neutral-800">{p.hero.summary}</p>

        <H2>{t.sections.experience.title}</H2>
        {p.experience.map((job) => (
          <section key={job.organization} className="mb-3 break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-bold text-neutral-950">
                {job.role} — {job.organization}
              </h3>
              <span className="text-[11.5px] text-neutral-600">{job.period}</span>
            </div>
            {job.timeline && (
              <p className="text-[11.5px] text-neutral-600">
                {job.timelineLabel}: {job.timeline.map((step) => `${step.role} (${step.period})`).join(" → ")}
              </p>
            )}
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-neutral-800">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </section>
        ))}

        <H2>{t.sections.projects.title}</H2>
        {p.projects.map((project) => (
          <section key={project.slug} className="mb-2.5 break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-bold text-neutral-950">
                {project.title} <span className="font-normal text-neutral-600">· {project.subtitle}</span>
              </h3>
              <span className="text-[11.5px] text-neutral-600">{project.period}</span>
            </div>
            <p className="text-neutral-800">{project.summary}</p>
            <p className="text-[11.5px] text-neutral-600">
              {project.stack.join(" · ")} ·{" "}
              <a href={`${SITE_URL}${projectPath(lang, project.slug)}`} className="underline">{t.caseStudy.label}</a>
              {project.demoUrl && (
                <>
                  {" · "}
                  <a href={project.demoUrl} className="underline">{project.demoUrl.replace(/^https:\/\/|\/$/g, "")}</a>
                </>
              )}
            </p>
          </section>
        ))}

        <H2>{t.sections.education.title}</H2>
        {p.education.map((item) => (
          <section key={item.degree} className="mb-1.5 break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-bold text-neutral-950">
                {item.degree} — <WithPlaceholders text={item.institution} />
              </h3>
              <span className="text-[11.5px] text-neutral-600">
                <WithPlaceholders text={item.period} />
              </span>
            </div>
            <p className="text-neutral-700">{item.note ?? item.badge}</p>
          </section>
        ))}

        <H2>{t.sections.certifications.title}</H2>
        <p className="text-neutral-800">{certs.map((cert) => `${cert.name} (${cert.issuer}, ${cert.date})`).join(" · ")}</p>

        <H2>{t.cv.skills}</H2>
        <ul className="space-y-0.5 text-neutral-800">
          {p.stack.map((category) => (
            <li key={category.category}>
              <span className="font-semibold">{category.category}:</span> <WithPlaceholders text={category.skills.join(", ")} />
            </li>
          ))}
        </ul>

        <H2>{t.cv.languages}</H2>
        <p className="text-neutral-800">{p.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</p>
      </article>
    </main>
  );
}

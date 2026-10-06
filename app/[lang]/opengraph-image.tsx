import { getProfile, isLocale, LOCALES } from "@/content";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Marco Lagunes — Full-Stack Developer";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const { person, hero } = getProfile(isLocale(lang) ? lang : undefined);
  return renderOgImage({ badge: hero.badge, title: person.name, subtitle: hero.subtitle, body: hero.headline, footerLeft: "$ whoami" });
}

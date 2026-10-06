import { getProfile } from "@/content";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Marco Lagunes — Full-Stack Developer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  const { person, hero } = getProfile();
  return renderOgImage({ badge: hero.badge, title: person.name, subtitle: hero.subtitle, body: hero.headline, footerLeft: "$ whoami" });
}

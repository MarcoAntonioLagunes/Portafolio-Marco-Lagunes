import { Briefcase, Code2, Mail, MessageCircle, Phone } from "lucide-react";
import type { SocialLink } from "@/content/types";

const ICONS = {
  github: Code2,
  linkedin: Briefcase,
  mail: Mail,
  phone: Phone,
  whatsapp: MessageCircle,
} satisfies Record<SocialLink["icon"], typeof Code2>;

export function SocialIcon({
  icon,
  className,
}: {
  icon: SocialLink["icon"];
  className?: string;
}) {
  const Icon = ICONS[icon];
  return <Icon aria-hidden="true" className={className} />;
}

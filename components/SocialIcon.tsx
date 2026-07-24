import { Briefcase, Code2, Mail, Phone } from "lucide-react";
import type { SocialLink } from "@/lib/types";

const ICONS = {
  github: Code2,
  linkedin: Briefcase,
  mail: Mail,
  phone: Phone,
} satisfies Record<SocialLink["icon"], typeof Code2>;

export function SocialIcon({
  icon,
  className,
}: {
  icon: SocialLink["icon"];
  className?: string;
}) {
  const Icon = ICONS[icon];
  return <Icon className={className} />;
}

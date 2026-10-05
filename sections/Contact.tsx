"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, Mail, MessageCircle, Phone } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialIcon } from "@/components/SocialIcon";
import { ContactForm } from "@/components/ContactForm";
import { FloatingCodeBackground } from "@/components/FloatingCodeBackground";
import { fadeInUpProps } from "@/lib/animations";
import { socialLinks } from "@/lib/data";
import { CV_PATH } from "@/lib/site";

export function Contact() {
  const reduced = useReducedMotion();
  const emailLink = socialLinks.find((link) => link.icon === "mail");
  const phoneLink = socialLinks.find((link) => link.icon === "phone");
  const linkedinLink = socialLinks.find((link) => link.icon === "linkedin");
  const whatsappHref = phoneLink
    ? `https://wa.me/${phoneLink.href.replace(/[^\d]/g, "")}`
    : undefined;

  return (
    <section id="contacto" className="relative isolate scroll-mt-24 overflow-hidden border-t border-border bg-surface3/50 py-24">
      <FloatingCodeBackground density="low" opacity="subtle" variant="contact" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="contacto" title="Hablemos" />

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
          <motion.div {...fadeInUpProps(!!reduced)}>
            <ContactForm />
          </motion.div>

          <motion.div {...fadeInUpProps(!!reduced, 0.1)} className="flex flex-col gap-3 lg:w-64">
            {emailLink && (
              <a
                href={emailLink.href}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Mail className="h-4 w-4 text-accent" /> Email
              </a>
            )}
            {phoneLink && (
              <a
                href={phoneLink.href}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Phone className="h-4 w-4 text-accent" /> Llamar
              </a>
            )}
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <MessageCircle className="h-4 w-4 text-accent" /> WhatsApp
              </a>
            )}
            {linkedinLink && (
              <a
                href={linkedinLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <SocialIcon icon="linkedin" className="h-4 w-4 text-accent" /> LinkedIn
              </a>
            )}

            <a
              href={CV_PATH}
              download
              className="flex items-center gap-3 rounded-xl border border-border bg-muted px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Download className="h-4 w-4 text-accent" /> Descargar CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Mail, MessageCircle, Phone } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialIcon } from "@/components/SocialIcon";
import { fadeInUpProps } from "@/lib/animations";
import { socialLinks } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const emailLink = socialLinks.find((link) => link.icon === "mail");
  const phoneLink = socialLinks.find((link) => link.icon === "phone");
  const linkedinLink = socialLinks.find((link) => link.icon === "linkedin");
  const whatsappHref = phoneLink
    ? `https://wa.me/${phoneLink.href.replace(/[^\d]/g, "")}`
    : undefined;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="contacto" title="Hablemos" />

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
          <motion.form
            {...fadeInUpProps(!!reduced)}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div>
              <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-none rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 w-fit rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-all duration-300 hover:scale-[1.04] hover:bg-accent/90 hover:shadow-[0_0_24px_-2px_hsl(var(--accent)/0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
            >
              {status === "loading" ? "Enviando..." : "Enviar mensaje"}
            </button>

            {status === "success" && (
              <p className="text-sm text-accent">Mensaje enviado. Gracias por escribir.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">
                Algo salió mal. Intenta de nuevo o usa uno de los contactos directos.
              </p>
            )}
          </motion.form>

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
              href="/cv-marco-lagunes.pdf"
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

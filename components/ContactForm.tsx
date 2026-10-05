"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";
type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

/** Debe coincidir con el atributo name del formulario en public/__forms.html. */
const FORM_NAME = "contacto";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputClass =
  "mt-2 w-full rounded-lg border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-red-400";

function validate(data: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (data.name.length < 2) errors.name = "Escribe tu nombre (mínimo 2 caracteres).";
  if (!EMAIL_RE.test(data.email)) errors.email = "Escribe un email válido, por ejemplo nombre@empresa.com.";
  if (data.message.length < 10) errors.message = "Cuéntame un poco más (mínimo 10 caracteres).";
  if (data.message.length > 4000) errors.message = "El mensaje es demasiado largo (máximo 4000 caracteres).";
  return errors;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    const nextErrors = validate(data);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const body = new URLSearchParams();
      formData.forEach((value, key) => body.append(key, String(value)));
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const fieldProps = (field: Field) => ({
    id: field,
    name: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    onChange: () => errors[field] && setErrors((prev) => ({ ...prev, [field]: undefined })),
  });

  const fieldError = (field: Field) =>
    errors[field] && (
      <p id={`${field}-error`} className="mt-1.5 text-xs text-red-300">
        {errors[field]}
      </p>
    );

  return (
    <form name={FORM_NAME} noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input type="hidden" name="locale" value="es" />
      {/* Honeypot: invisible para personas; si un bot lo llena, Netlify descarta el envío. */}
      <p className="hidden" aria-hidden="true">
        <label>
          No llenar: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div>
        <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Nombre
        </label>
        <input {...fieldProps("name")} type="text" autoComplete="name" required className={inputClass} />
        {fieldError("name")}
      </div>

      <div>
        <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Email
        </label>
        <input {...fieldProps("email")} type="email" autoComplete="email" required className={inputClass} />
        {fieldError("email")}
      </div>

      <div>
        <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Mensaje
        </label>
        <textarea {...fieldProps("message")} required rows={5} className={cn(inputClass, "resize-none")} />
        {fieldError("message")}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 w-fit rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-all duration-300 hover:scale-[1.04] hover:bg-accent/90 hover:shadow-[0_0_24px_-2px_hsl(var(--accent)/0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>

      <div role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
        {status === "success" && (
          <p className="text-mint">Mensaje enviado. Gracias por escribir, te respondo pronto.</p>
        )}
        {status === "error" && (
          <p className="text-red-300">
            No se pudo enviar el mensaje. Intenta de nuevo o escríbeme por email o WhatsApp.
          </p>
        )}
      </div>
    </form>
  );
}

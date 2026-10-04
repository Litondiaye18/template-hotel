"use client";

import { useState, type FormEvent } from "react";
import { buildWhatsAppMessage, generateWhatsAppUrl } from "@/lib/whatsapp";

type Values = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const empty: Values = { name: "", phone: "", email: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Values>>({});
  const [notice, setNotice] = useState("");
  const [preview, setPreview] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  function update(name: keyof Values, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Values> = {};
    if (!values.name.trim()) nextErrors.name = "Indiquez votre nom.";
    if (!values.email.trim()) nextErrors.email = "Indiquez votre e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "L’e-mail semble invalide.";
    }
    if (values.phone.trim() && values.phone.replace(/\D/g, "").length < 8) {
      nextErrors.phone = "Le numéro semble incomplet.";
    }
    if (!values.message.trim()) nextErrors.message = "Écrivez votre message.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setNotice("");
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    const payload = {
      intent: "contact" as const,
      name: values.name,
      phone: values.phone,
      email: values.email,
      message: values.message,
    };
    const url = generateWhatsAppUrl(payload);
    if (!url) {
      setErrors({ message: "Le numéro WhatsApp de l’établissement n’est pas configuré." });
      return;
    }
    setNotice("Votre message va être envoyé à l’hôtel via WhatsApp.");
    setPreview(buildWhatsAppMessage(payload));
    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="border border-line bg-surface p-5 sm:p-8" onSubmit={onSubmit} noValidate>
      <p className="text-sm leading-relaxed text-muted">
        Ce formulaire n’enregistre rien sur le site. Il prépare un message WhatsApp.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <ContactField
          id="contact-name"
          label="Nom"
          required
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(value) => update("name", value)}
        />
        <ContactField
          id="contact-phone"
          label="Téléphone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(value) => update("phone", value)}
        />
        <ContactField
          id="contact-email"
          label="E-mail"
          required
          type="email"
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={(value) => update("email", value)}
          className="sm:col-span-2"
        />
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="contact-message">
            Message <span className="text-secondary">*</span>
          </label>
          <textarea
            id="contact-message"
            className="field"
            required
            value={values.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            onChange={(event) => update("message", event.target.value)}
          />
          {errors.message ? (
            <p id="contact-message-error" className="field-error">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">
        Envoyer via WhatsApp
      </button>
      {notice ? (
        <div className="note mt-6" role="status">
          <p className="font-semibold">{notice}</p>
          {preview ? (
            <pre className="mt-4 font-sans text-sm leading-relaxed whitespace-pre-wrap">{preview}</pre>
          ) : null}
          {whatsappUrl ? (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-4">
              Ouvrir WhatsApp
            </a>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

function ContactField({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  autoComplete,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="field-label" htmlFor={id}>
        {label} {required ? <span className="text-secondary">*</span> : null}
      </label>
      <input
        id={id}
        className="field"
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

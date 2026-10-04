"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { rooms } from "@/data/rooms";
import { siteConfig } from "@/config/site";
import { buildWhatsAppMessage, generateWhatsAppUrl } from "@/lib/whatsapp";

type FieldName =
  | "name"
  | "phone"
  | "email"
  | "room"
  | "checkIn"
  | "checkOut"
  | "adults"
  | "children"
  | "message";

type Values = Record<FieldName, string>;

const fields: Values = {
  name: "",
  phone: "",
  email: "",
  room: "",
  checkIn: "",
  checkOut: "",
  adults: "2",
  children: "0",
  message: "",
};

function todayISO() {
  const date = new Date();
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function validate(values: Values) {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!values.name.trim()) errors.name = "Indiquez votre nom.";
  const phoneDigits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) errors.phone = "Indiquez votre téléphone.";
  else if (phoneDigits.length < 8) errors.phone = "Le numéro semble incomplet.";
  if (!values.email.trim()) errors.email = "Indiquez votre e-mail.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "L’e-mail semble invalide.";
  }
  if (!values.room) errors.room = "Choisissez une chambre.";
  if (!values.checkIn) errors.checkIn = "Indiquez la date d’arrivée.";
  if (!values.checkOut) errors.checkOut = "Indiquez la date de départ.";
  if (values.checkIn && values.checkOut && values.checkOut <= values.checkIn) {
    errors.checkOut = "Le départ doit être après l’arrivée.";
  }
  const adults = Number(values.adults);
  const children = Number(values.children);
  if (!Number.isInteger(adults) || adults < 1 || adults > 10) {
    errors.adults = "Indiquez entre 1 et 10 adultes.";
  }
  if (!Number.isInteger(children) || children < 0 || children > 8) {
    errors.children = "Indiquez entre 0 et 8 enfants.";
  }
  return errors;
}

export function BookingForm() {
  const params = useSearchParams();
  const preset = params.get("chambre") ?? "";
  const validPreset = rooms.some((room) => room.slug === preset && room.available) ? preset : "";
  const [values, setValues] = useState<Values>({ ...fields, room: validPreset });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [notice, setNotice] = useState("");
  const [preview, setPreview] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const selected = rooms.find((room) => room.slug === values.room);
  const party = Number(values.adults) + Number(values.children);
  const overCapacity = Boolean(selected && Number.isFinite(party) && party > selected.capacity);

  function update(name: FieldName, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setNotice("");
      setPreview("");
      setWhatsappUrl("");
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`booking-${first}`)?.focus();
      return;
    }

    const roomName = selected?.name ?? "À préciser";
    const payload = {
      intent: "reservation" as const,
      room: roomName,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      adults: Number(values.adults),
      children: Number(values.children),
      name: values.name,
      phone: values.phone,
      email: values.email,
      message: values.message,
    };
    const url = generateWhatsAppUrl(payload);
    if (!url) {
      setErrors({ phone: "Le numéro WhatsApp de l’établissement n’est pas configuré." });
      return;
    }
    setNotice(siteConfig.reservationNotice);
    setPreview(buildWhatsAppMessage(payload));
    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const today = todayISO();

  return (
    <form className="border border-line bg-surface p-5 sm:p-8" onSubmit={onSubmit} noValidate>
      <p className="text-sm leading-relaxed text-muted">
        Aucun paiement n’est demandé. La maison vérifie les disponibilités avant de confirmer.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          id="booking-name"
          label="Nom"
          required
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(value) => update("name", value)}
        />
        <Field
          id="booking-phone"
          label="Téléphone"
          required
          type="tel"
          autoComplete="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(value) => update("phone", value)}
        />
        <Field
          id="booking-email"
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
          <label className="field-label" htmlFor="booking-room">
            Chambre <span className="text-secondary">*</span>
          </label>
          <select
            id="booking-room"
            className="field"
            value={values.room}
            required
            aria-invalid={Boolean(errors.room)}
            aria-describedby={errors.room ? "booking-room-error" : undefined}
            onChange={(event) => update("room", event.target.value)}
          >
            <option value="">Choisir une chambre</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.slug} disabled={!room.available}>
                {room.name}
                {room.available ? "" : " (indisponible)"}
              </option>
            ))}
          </select>
          {errors.room ? (
            <p id="booking-room-error" className="field-error">
              {errors.room}
            </p>
          ) : null}
        </div>
        <Field
          id="booking-checkIn"
          label="Date d’arrivée"
          required
          type="date"
          min={today}
          value={values.checkIn}
          error={errors.checkIn}
          onChange={(value) => update("checkIn", value)}
        />
        <Field
          id="booking-checkOut"
          label="Date de départ"
          required
          type="date"
          min={values.checkIn || today}
          value={values.checkOut}
          error={errors.checkOut}
          onChange={(value) => update("checkOut", value)}
        />
        <Field
          id="booking-adults"
          label="Nombre d’adultes"
          required
          type="number"
          min="1"
          max="10"
          value={values.adults}
          error={errors.adults}
          onChange={(value) => update("adults", value)}
        />
        <Field
          id="booking-children"
          label="Nombre d’enfants"
          required
          type="number"
          min="0"
          max="8"
          value={values.children}
          error={errors.children}
          onChange={(value) => update("children", value)}
        />
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="booking-message">
            Message
          </label>
          <textarea
            id="booking-message"
            className="field"
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
          />
        </div>
      </div>
      {overCapacity && selected ? (
        <p className="note mt-5 text-sm" role="status">
          Cette chambre accueille {selected.capacity}{" "}
          {selected.capacity > 1 ? "personnes" : "personne"}. Vous pouvez tout de même envoyer la
          demande : l’hôtel confirmera ce qui est possible.
        </p>
      ) : null}
      <p className="mt-5 text-sm text-muted">Les champs marqués d’un astérisque sont obligatoires.</p>
      <button type="submit" className="btn btn-primary mt-5 w-full sm:w-auto">
        Envoyer la demande sur WhatsApp
      </button>
      {notice ? (
        <div className="note mt-6" role="status">
          <p className="font-semibold">{notice}</p>
          <p className="mt-2 text-sm">
            Cette étape ne confirme pas la réservation. L’hôtel vous répond après vérification.
          </p>
          {preview ? (
            <pre className="mt-4 font-sans text-sm leading-relaxed whitespace-pre-wrap">{preview}</pre>
          ) : null}
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary mt-4"
            >
              Ouvrir WhatsApp
            </a>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  autoComplete,
  min,
  max,
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
  min?: string;
  max?: string;
  className?: string;
}) {
  const errorId = `${id}-error`;
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
        min={min}
        max={max}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={errorId} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

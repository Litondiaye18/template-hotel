import { siteConfig } from "@/config/site";

export type WhatsAppIntent = "reservation" | "information" | "contact";

export type WhatsAppPayload = {
  intent: WhatsAppIntent;
  room?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string | number;
  adults?: number;
  children?: number;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

function formatDate(value?: string) {
  if (!value?.trim()) return "À préciser";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

function formatGuests(payload: WhatsAppPayload) {
  if (payload.adults != null) {
    const adults = `${payload.adults} adulte${payload.adults > 1 ? "s" : ""}`;
    if (payload.children && payload.children > 0) {
      const children = `${payload.children} enfant${payload.children > 1 ? "s" : ""}`;
      return `${adults}, ${children}`;
    }
    return adults;
  }
  if (payload.guests != null && String(payload.guests).trim()) {
    return String(payload.guests);
  }
  return "À préciser";
}

function reservationMessage(payload: WhatsAppPayload) {
  const lines = [
    "Bonjour, je souhaite faire une demande de réservation.",
    "",
    `Hôtel : ${siteConfig.siteName}`,
    `Chambre : ${payload.room?.trim() || "À préciser"}`,
    `Date d'arrivée : ${formatDate(payload.checkIn)}`,
    `Date de départ : ${formatDate(payload.checkOut)}`,
    `Nombre de personnes : ${formatGuests(payload)}`,
  ];

  if (payload.name?.trim()) lines.push(`Nom : ${payload.name.trim()}`);
  if (payload.phone?.trim()) lines.push(`Téléphone : ${payload.phone.trim()}`);
  if (payload.email?.trim()) lines.push(`E-mail : ${payload.email.trim()}`);
  if (payload.message?.trim()) lines.push(`Message : ${payload.message.trim()}`);

  lines.push("", "Merci.");
  return lines.join("\n");
}

function informationMessage(payload: WhatsAppPayload) {
  const lines = [
    "Bonjour, je souhaite obtenir des informations.",
    "",
    `Hôtel : ${siteConfig.siteName}`,
  ];
  if (payload.room?.trim()) lines.push(`Chambre : ${payload.room.trim()}`);
  if (payload.message?.trim()) lines.push(`Message : ${payload.message.trim()}`);
  lines.push("", "Merci.");
  return lines.join("\n");
}

function contactMessage(payload: WhatsAppPayload) {
  return [
    "Bonjour, je souhaite vous contacter.",
    "",
    `Hôtel : ${siteConfig.siteName}`,
    `Nom : ${payload.name?.trim() || "À préciser"}`,
    `Téléphone : ${payload.phone?.trim() || "À préciser"}`,
    `E-mail : ${payload.email?.trim() || "À préciser"}`,
    `Message : ${payload.message?.trim() || "À préciser"}`,
    "",
    "Merci.",
  ].join("\n");
}

export function buildWhatsAppMessage(payload: WhatsAppPayload) {
  if (payload.intent === "reservation") return reservationMessage(payload);
  if (payload.intent === "contact") return contactMessage(payload);
  return informationMessage(payload);
}

export function generateWhatsAppUrl(
  payload: WhatsAppPayload,
  phone: string = siteConfig.whatsapp,
) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  const text = buildWhatsAppMessage(payload);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

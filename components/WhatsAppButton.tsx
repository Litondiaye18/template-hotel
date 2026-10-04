import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { generateWhatsAppUrl, type WhatsAppPayload } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  payload: WhatsAppPayload;
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "on-dark" | "floating";
};

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm0 17.95h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.2.83.85-3.11-.2-.32a8.07 8.07 0 0 1-1.24-4.21c0-4.46 3.66-8.08 8.16-8.08 2.18 0 4.23.84 5.77 2.37a8.05 8.05 0 0 1 2.39 5.71c0 4.46-3.66 8.12-8.09 8.12Zm4.46-6.06c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.19-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.57.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export function WhatsAppButton({
  payload,
  children,
  className,
  variant = "secondary",
}: WhatsAppButtonProps) {
  const href = generateWhatsAppUrl(payload);
  const floating = variant === "floating";
  const label = children ?? (floating ? "WhatsApp" : siteConfig.cta.whatsapp);
  const classes =
    className ??
    (floating
      ? "btn btn-primary fixed right-4 bottom-4 z-40 shadow-[0_12px_40px_rgba(20,23,20,0.28)]"
      : variant === "primary"
        ? "btn btn-primary"
        : variant === "on-dark"
          ? "btn btn-on-dark"
          : "btn btn-secondary");

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      aria-label={
        floating
          ? `Contacter ${siteConfig.siteName} sur WhatsApp`
          : `${label}, ouvre WhatsApp`
      }
    >
      <WhatsAppIcon />
      <span>{label}</span>
    </a>
  );
}

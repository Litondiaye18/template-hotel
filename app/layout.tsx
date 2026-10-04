import type { Metadata, Viewport } from "next";
import type { CSSProperties, ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const themeStyle = {
  "--hotel-primary": siteConfig.theme.primary,
  "--hotel-secondary": siteConfig.theme.secondary,
  "--hotel-accent": siteConfig.theme.accent,
  "--hotel-background": siteConfig.theme.background,
  "--hotel-text": siteConfig.theme.text,
} as CSSProperties;

export const viewport: Viewport = {
  themeColor: siteConfig.theme.primary,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.siteName} | ${siteConfig.city}`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.siteName,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.siteName,
    title: siteConfig.siteName,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: siteConfig.favicon, type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr" style={themeStyle}>
      <body className="min-h-screen">
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <WhatsAppButton variant="floating" payload={{ intent: "information" }} />
      </body>
    </html>
  );
}

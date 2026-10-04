import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";
import { OpeningHours } from "@/components/OpeningHours";
import { SectionTitle } from "@/components/SectionTitle";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata = createPageMetadata(
  "Contact",
  `Téléphone, WhatsApp, e-mail et adresse de ${siteConfig.siteName} à ${siteConfig.city}.`,
  "/contact",
);

export default function ContactPage() {
  return (
    <section className="section">
      <div className="shell">
        <SectionTitle
          eyebrow="Écrire"
          title="Contact"
          description="Appelez, écrivez, ou préparez un message WhatsApp. La maison répond en personne."
          align="left"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-3xl">Coordonnées</h2>
            <ul className="mt-6 space-y-4">
              <li>
                <p className="text-sm text-muted">Téléphone</p>
                <a className="text-lg font-medium" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <p className="text-sm text-muted">WhatsApp</p>
                <WhatsAppButton
                  payload={{ intent: "contact" }}
                  className="btn btn-secondary mt-2"
                />
              </li>
              <li>
                <p className="text-sm text-muted">E-mail</p>
                <a className="text-lg font-medium break-all" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <p className="text-sm text-muted">Adresse</p>
                <p className="text-lg font-medium">
                  {siteConfig.address}
                  <br />
                  {siteConfig.city}, {siteConfig.country}
                </p>
              </li>
            </ul>
            <div className="mt-8">
              <OpeningHours titleId="contact-horaires" />
            </div>
          </div>
          <div className="min-h-80 overflow-hidden border border-line bg-surface">
            <iframe
              title={`Carte de ${siteConfig.siteName}`}
              src={siteConfig.googleMapsEmbedUrl}
              className="h-full min-h-[28rem] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="text-4xl">Formulaire de contact</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

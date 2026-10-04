import { siteConfig } from "@/config/site";
import { OpeningHours } from "@/components/OpeningHours";
import { SectionTitle } from "@/components/SectionTitle";

export function LocationSection() {
  return (
    <section className="section" aria-labelledby="localisation-titre">
      <div className="shell">
        <SectionTitle
          id="localisation-titre"
          eyebrow="Adresse"
          title="Venir au riad"
          description="La maison se trouve dans la médina. Le plan ouvre l’itinéraire, et la réception guide les derniers mètres dans le derb."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="border border-line bg-surface p-6 sm:p-8">
            <h3 className="text-3xl text-ink">{siteConfig.siteName}</h3>
            <address className="mt-4 text-base leading-relaxed not-italic">
              {siteConfig.address}
              <br />
              {siteConfig.city}, {siteConfig.country}
            </address>
            <p className="mt-4">
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline decoration-accent underline-offset-4"
              >
                Ouvrir dans Google Maps
              </a>
            </p>
            <div className="mt-8">
              <OpeningHours titleId="localisation-horaires" />
            </div>
          </div>
          <div className="min-h-72 overflow-hidden border border-line bg-surface">
            <iframe
              title={`Carte de ${siteConfig.siteName} à ${siteConfig.city}`}
              src={siteConfig.googleMapsEmbedUrl}
              className="h-full min-h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

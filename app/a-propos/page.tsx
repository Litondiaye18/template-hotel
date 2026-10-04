import Link from "next/link";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = createPageMetadata(
  "À propos",
  `${siteConfig.siteName}, maison d’hôtes à ${siteConfig.city}. Histoire, accueil et informations pratiques.`,
  "/a-propos",
);

export default function AboutPage() {
  return (
    <section className="section">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)]">
        <div>
          <SectionTitle
            eyebrow={siteConfig.about.eyebrow}
            title={siteConfig.about.title}
            align="left"
          />
          <div className="mt-8 space-y-5 text-base leading-relaxed">
            {siteConfig.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/chambres" className="btn btn-primary w-full sm:w-auto">
              Voir les chambres
            </Link>
            <Link href="/contact" className="btn btn-secondary w-full sm:w-auto">
              Écrire à la maison
            </Link>
          </div>
        </div>
        <aside className="h-fit border border-line bg-surface p-6">
          <h2 className="text-3xl">Informations pratiques</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-muted">Arrivée</dt>
              <dd className="text-base font-medium">À partir de {siteConfig.checkIn}</dd>
            </div>
            <div>
              <dt className="text-muted">Départ</dt>
              <dd className="text-base font-medium">Jusqu’à {siteConfig.checkOut}</dd>
            </div>
            <div>
              <dt className="text-muted">Adresse</dt>
              <dd className="text-base font-medium">
                {siteConfig.address}, {siteConfig.city}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Téléphone</dt>
              <dd className="text-base font-medium">
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

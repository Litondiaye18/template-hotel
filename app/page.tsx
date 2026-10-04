import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { getFeaturedRooms } from "@/data/rooms";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { LocationSection } from "@/components/LocationSection";
import { ReservationCta } from "@/components/ReservationCta";
import { RoomGrid } from "@/components/RoomGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { Testimonials } from "@/components/Testimonials";
import { WhyUs } from "@/components/WhyUs";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.siteName} | Hôtel à ${siteConfig.city}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.siteName} | Hôtel à ${siteConfig.city}`,
    description: siteConfig.description,
    url: "/",
    locale: "fr_FR",
    type: "website",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: siteConfig.siteName,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.hero.image}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressCountry: siteConfig.country,
    },
    checkinTime: siteConfig.checkIn,
    checkoutTime: siteConfig.checkOut,
    sameAs: siteConfig.socialLinks.map((link) => link.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <section className="section" aria-labelledby="chambres-titre">
        <div className="shell">
          <SectionTitle
            id="chambres-titre"
            eyebrow="Hébergements"
            title="Chambres mises en avant"
            description="Des volumes calmes, des prix affichés par nuit, et une demande de séjour envoyée directement à la maison."
          />
          <div className="mt-12">
            <RoomGrid rooms={getFeaturedRooms()} />
          </div>
          <p className="mt-8 text-center">
            <Link href="/chambres" className="btn btn-secondary">
              Toutes les chambres
            </Link>
          </p>
        </div>
      </section>
      <section className="section bg-surface" aria-labelledby="services-titre">
        <div className="shell">
          <SectionTitle
            id="services-titre"
            eyebrow="Le séjour"
            title="Services"
            description="L’essentiel pour arriver, se reposer et repartir, sans supplément caché dans la présentation."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.id}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section" aria-labelledby="galerie-titre">
        <div className="shell">
          <SectionTitle
            id="galerie-titre"
            eyebrow="Regards"
            title="Galerie"
            description="Visuels de démonstration. Remplacez-les par les photographies de l’établissement."
          />
          <div className="mt-12">
            <Gallery showFilters={false} limit={6} />
          </div>
          <p className="mt-8 text-center">
            <Link href="/galerie" className="btn btn-secondary">
              Voir toute la galerie
            </Link>
          </p>
        </div>
      </section>
      <WhyUs />
      <Testimonials />
      <LocationSection />
      <ReservationCta />
    </>
  );
}

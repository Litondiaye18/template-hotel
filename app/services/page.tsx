import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/seo";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata = createPageMetadata(
  "Services",
  "Petit-déjeuner, piscine, spa, restaurant, parking, réception et navette aéroport.",
  "/services",
);

export default function ServicesPage() {
  return (
    <section className="section">
      <div className="shell">
        <SectionTitle
          eyebrow="Le séjour"
          title="Services"
          description="Ces prestations accompagnent la chambre. Les horaires et les suppléments éventuels se confirment avec la maison."
          align="left"
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
  );
}

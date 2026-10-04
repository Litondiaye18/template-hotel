import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";
import { BookingForm } from "@/components/BookingForm";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = createPageMetadata(
  "Demande de réservation",
  `Envoyez une demande de séjour à ${siteConfig.siteName}. La maison confirme la disponibilité, sans paiement en ligne.`,
  "/reservation",
);

export default function ReservationPage() {
  return (
    <section className="section">
      <div className="shell max-w-3xl">
        <SectionTitle
          eyebrow="Séjour"
          title="Demande de réservation"
          description={siteConfig.reservationNotice}
          align="left"
        />
        <div className="mt-10">
          <Suspense fallback={<p className="text-muted">Chargement du formulaire…</p>}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

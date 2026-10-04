import Link from "next/link";
import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function ReservationCta() {
  return (
    <section className="section" aria-labelledby="cta-reservation">
      <div className="shell">
        <div className="bg-primary px-6 py-12 text-on-dark sm:px-12 sm:py-16">
          <p className="eyebrow text-on-dark-muted">Séjour</p>
          <h2 id="cta-reservation" className="mt-3 max-w-2xl text-4xl sm:text-5xl">
            Préparer une demande de séjour
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-on-dark-muted">
            Indiquez vos dates et la chambre souhaitée. Le message part sur WhatsApp, et la maison
            confirme ensuite la disponibilité.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/reservation" className="btn btn-light w-full sm:w-auto">
              {siteConfig.cta.booking}
            </Link>
            <WhatsAppButton
              payload={{ intent: "reservation" }}
              className="btn btn-on-dark w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

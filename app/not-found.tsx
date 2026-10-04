import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell max-w-2xl">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-5xl text-ink">Page introuvable</h1>
        <p className="mt-4 text-muted">Cette adresse ne correspond à aucune page du site.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary w-full sm:w-auto">
            Retour à l’accueil
          </Link>
          <Link href="/chambres" className="btn btn-secondary w-full sm:w-auto">
            Voir les chambres
          </Link>
        </div>
      </div>
    </section>
  );
}

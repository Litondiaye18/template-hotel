import { testimonials } from "@/data/testimonials";
import { SectionTitle } from "@/components/SectionTitle";

export function Testimonials() {
  return (
    <section className="section bg-surface" aria-labelledby="temoignages-titre">
      <div className="shell">
        <SectionTitle
          id="temoignages-titre"
          eyebrow="Démonstration"
          title="Exemples de témoignages"
          description="Ces textes montrent seulement la mise en page. Ils ne sont pas de véritables avis clients."
        />
        <p className="note mx-auto mt-8 max-w-3xl text-sm leading-relaxed" role="note">
          Exemples de témoignages — données de démonstration fournies avec le template. Ne les
          présentez pas comme des avis réels. Remplacez-les dans data/testimonials.ts ou retirez
          la section avant une mise en ligne.
        </p>
        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.id} className="flex h-full flex-col border border-line bg-canvas p-6">
              <p className="text-xs font-semibold tracking-[0.16em] text-secondary uppercase">
                Exemple de démonstration
              </p>
              <blockquote className="mt-4 flex-1 font-serif text-2xl leading-snug text-ink">
                {item.quote}
              </blockquote>
              <footer className="mt-6 text-sm">
                <p className="font-semibold">{item.label}</p>
                <p className="text-muted">{item.context}</p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

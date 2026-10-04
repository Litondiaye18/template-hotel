import { siteConfig } from "@/config/site";
import { SectionTitle } from "@/components/SectionTitle";

export function WhyUs() {
  return (
    <section className="section" aria-labelledby="pourquoi-titre">
      <div className="shell">
        <SectionTitle
          id="pourquoi-titre"
          eyebrow={siteConfig.city}
          title="Pourquoi nous"
          description="Quatre raisons de poser les valises ici, avant même de comparer les chambres."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {siteConfig.whyUs.map((item) => (
            <li key={item.title} className="border border-line bg-surface p-6 sm:p-8">
              <h3 className="text-3xl text-ink">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

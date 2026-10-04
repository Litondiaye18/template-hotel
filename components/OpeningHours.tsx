import { siteConfig } from "@/config/site";

export function OpeningHours({
  titleId = "horaires-titre",
  heading = "Horaires",
  tone = "light",
}: {
  titleId?: string;
  heading?: string;
  tone?: "light" | "dark";
}) {
  const titleClass = tone === "dark" ? "text-on-dark" : "text-ink";
  const valueClass = tone === "dark" ? "text-on-dark-muted" : "text-muted";
  const ruleClass = tone === "dark" ? "border-white/20" : "border-line";

  return (
    <section aria-labelledby={titleId}>
      <h3 id={titleId} className={`text-2xl ${titleClass}`}>
        {heading}
      </h3>
      <dl className="mt-4 space-y-3">
        {siteConfig.openingHours.map((item) => (
          <div key={item.label} className={`flex items-baseline justify-between gap-4 border-b pb-2 ${ruleClass}`}>
            <dt className="text-sm font-medium">{item.label}</dt>
            <dd className={`text-right text-sm ${valueClass}`}>{item.value}</dd>
          </div>
        ))}
      </dl>
      <p className={`mt-4 text-sm ${valueClass}`}>
        Arrivée à partir de {siteConfig.checkIn}. Départ jusqu’à {siteConfig.checkOut}.
      </p>
    </section>
  );
}

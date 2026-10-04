import type { Service } from "@/data/services";
import { SmartImage } from "@/components/SmartImage";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex h-full flex-col border border-line bg-surface">
      <div className="relative aspect-[16/10]">
        <SmartImage
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-3xl text-ink">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
      </div>
    </article>
  );
}

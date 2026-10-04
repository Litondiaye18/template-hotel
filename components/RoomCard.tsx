import Link from "next/link";
import type { Room } from "@/data/rooms";
import { formatCapacity, formatPrice } from "@/lib/format";
import { SmartImage } from "@/components/SmartImage";

export function RoomCard({ room }: { room: Room }) {
  return (
    <article className="flex h-full flex-col border border-line bg-surface">
      <Link
        href={`/chambres/${room.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <SmartImage
          src={room.images[0]}
          alt={room.imageAlts[0] ?? `${room.name}, illustration de démonstration`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {room.available ? null : (
          <span className="absolute top-3 left-3 bg-secondary px-2 py-1 text-xs font-semibold tracking-wide text-on-dark uppercase">
            Indisponible
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-3xl text-ink">
          <Link href={`/chambres/${room.slug}`}>{room.name}</Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{room.shortDescription}</p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink">
          <li>{formatCapacity(room.capacity)}</li>
          <li>{room.beds}</li>
          <li>{room.size} m²</li>
        </ul>
        <div className="mt-auto flex flex-col gap-4 pt-6 min-[390px]:flex-row min-[390px]:items-end min-[390px]:justify-between">
          <p>
            <span className="block text-xs font-semibold tracking-[0.16em] text-muted uppercase">
              À partir de
            </span>
            <span className="font-serif text-3xl text-accent">
              {formatPrice(room.price, room.currency)}
            </span>
            <span className="text-sm text-muted"> / nuit</span>
          </p>
          <Link href={`/chambres/${room.slug}`} className="btn btn-secondary w-full min-[390px]:w-auto">
            Découvrir
          </Link>
        </div>
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoomBySlug, rooms, type Room } from "@/data/rooms";
import { formatCapacity, formatPrice } from "@/lib/format";
import { createPageMetadata } from "@/lib/seo";
import { Gallery } from "@/components/Gallery";
import { WhatsAppButton } from "@/components/WhatsAppButton";

type RoomPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return { title: "Chambre introuvable" };
  return createPageMetadata(room.name, room.shortDescription, `/chambres/${room.slug}`);
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  const others = rooms.filter((item) => item.slug !== room.slug);

  return (
    <article className="section">
      <div className="shell">
        <nav aria-label="Fil d’Ariane" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="underline decoration-accent underline-offset-4">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/chambres" className="underline decoration-accent underline-offset-4">
                Chambres
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink">{room.name}</li>
          </ol>
        </nav>
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
          <Gallery
            variant="feature"
            showFilters={false}
            items={room.images.map((image, index) => ({
              id: `${room.id}-${index}`,
              title: room.name,
              alt: room.imageAlts[index] ?? `${room.name}, visuel ${index + 1} de démonstration`,
              category: "chambres" as const,
              image,
            }))}
          />
          <RoomDetails room={room} />
        </div>
        {others.length > 0 ? (
          <section className="mt-16" aria-labelledby="autres-chambres">
            <h2 id="autres-chambres" className="text-4xl text-ink">
              Autres chambres
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/chambres/${item.slug}`}
                    className="flex min-h-16 items-center justify-between border border-line bg-surface px-4 py-3"
                  >
                    <span className="font-serif text-2xl">{item.name}</span>
                    <span className="text-sm text-accent">{formatPrice(item.price, item.currency)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}

function RoomDetails({ room }: { room: Room }) {
  return (
    <div>
      <p className="eyebrow">La chambre</p>
      <h1 className="mt-3 text-5xl text-ink sm:text-6xl">{room.name}</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">{room.description}</p>
      <p className="mt-6">
        <span className="block text-xs font-semibold tracking-[0.16em] text-muted uppercase">
          À partir de
        </span>
        <span className="font-serif text-4xl text-accent">{formatPrice(room.price, room.currency)}</span>
        <span className="text-muted"> / nuit</span>
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-5">
        <div>
          <dt className="text-sm text-muted">Capacité</dt>
          <dd className="font-medium">{formatCapacity(room.capacity)}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Lits</dt>
          <dd className="font-medium">{room.beds}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Superficie</dt>
          <dd className="font-medium">{room.size} m²</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Disponibilité</dt>
          <dd className="font-medium">{room.available ? "Ouverte à la demande" : "Indisponible"}</dd>
        </div>
      </dl>
      <h2 className="mt-8 text-3xl">Équipements</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {room.amenities.map((amenity) => (
          <li key={amenity} className="border border-line bg-surface px-3 py-2 text-sm">
            {amenity}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/reservation?chambre=${encodeURIComponent(room.slug)}`}
          className="btn btn-primary w-full sm:w-auto"
        >
          Réserver
        </Link>
        <WhatsAppButton
          payload={{ intent: "reservation", room: room.name }}
          className="btn btn-secondary w-full sm:w-auto"
        >
          Demander sur WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}

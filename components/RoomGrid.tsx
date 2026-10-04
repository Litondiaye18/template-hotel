import type { Room } from "@/data/rooms";
import { RoomCard } from "@/components/RoomCard";

export function RoomGrid({ rooms }: { rooms: Room[] }) {
  if (rooms.length === 0) {
    return <p className="text-muted">Aucune chambre à afficher pour le moment.</p>;
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {rooms.map((room) => (
        <li key={room.id}>
          <RoomCard room={room} />
        </li>
      ))}
    </ul>
  );
}

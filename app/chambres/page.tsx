import { rooms } from "@/data/rooms";
import { createPageMetadata } from "@/lib/seo";
import { RoomGrid } from "@/components/RoomGrid";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = createPageMetadata(
  "Chambres",
  "Chambres, suite et suite familiale : capacités, lits, superficies et tarifs par nuit.",
  "/chambres",
);

export default function RoomsPage() {
  return (
    <section className="section">
      <div className="shell">
        <SectionTitle
          eyebrow="Hébergements"
          title="Les chambres"
          description="Chaque fiche indique le prix, la capacité et les équipements. La demande de séjour se fait ensuite auprès de la maison."
          align="left"
        />
        <div className="mt-12">
          <RoomGrid rooms={rooms} />
        </div>
      </div>
    </section>
  );
}

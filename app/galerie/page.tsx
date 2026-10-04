import { createPageMetadata } from "@/lib/seo";
import { Gallery } from "@/components/Gallery";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = createPageMetadata(
  "Galerie",
  "Chambres, extérieur, piscine, restaurant, spa et espaces communs.",
  "/galerie",
);

export default function GalleryPage() {
  return (
    <section className="section">
      <div className="shell">
        <SectionTitle
          eyebrow="Regards"
          title="Galerie"
          description="Filtrez par lieu, ouvrez une image et passez à la suivante. Échap ferme la visionneuse."
          align="left"
        />
        <div className="mt-10">
          <Gallery />
        </div>
      </div>
    </section>
  );
}

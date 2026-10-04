export const galleryCategories = [
  { id: "chambres", label: "Chambres" },
  { id: "exterieur", label: "Extérieur" },
  { id: "piscine", label: "Piscine" },
  { id: "restaurant", label: "Restaurant" },
  { id: "spa", label: "Spa" },
  { id: "espaces-communs", label: "Espaces communs" },
] as const;

export type GalleryCategory = (typeof galleryCategories)[number]["id"];

export type GalleryImage = {
  id: string;
  title: string;
  alt: string;
  category: GalleryCategory;
  image: string;
};

export const galleryImages: GalleryImage[] = [
  {
    id: "exterieur-1",
    title: "Façade du riad",
    alt: "Illustration de démonstration de la façade et de la porte du riad",
    category: "exterieur",
    image: "/images/gallery/exterieur-1.svg",
  },
  {
    id: "suite-galerie",
    title: "Suite",
    alt: "Illustration de démonstration de la Suite",
    category: "chambres",
    image: "/images/rooms/suite-1.svg",
  },
  {
    id: "piscine-1",
    title: "Bassin du patio",
    alt: "Illustration de démonstration de la piscine dans le patio",
    category: "piscine",
    image: "/images/gallery/piscine-1.svg",
  },
  {
    id: "restaurant-1",
    title: "Table du soir",
    alt: "Illustration de démonstration de la salle du restaurant",
    category: "restaurant",
    image: "/images/gallery/restaurant-1.svg",
  },
  {
    id: "spa-1",
    title: "Salle de soins",
    alt: "Illustration de démonstration de la salle de spa",
    category: "spa",
    image: "/images/gallery/spa-1.svg",
  },
  {
    id: "communs-1",
    title: "Patio",
    alt: "Illustration de démonstration du patio et des espaces communs",
    category: "espaces-communs",
    image: "/images/gallery/communs-1.svg",
  },
  {
    id: "exterieur-2",
    title: "Toits de la médina",
    alt: "Illustration de démonstration des toits et de l'extérieur du riad",
    category: "exterieur",
    image: "/images/gallery/exterieur-2.svg",
  },
  {
    id: "deluxe-galerie",
    title: "Chambre Deluxe",
    alt: "Illustration de démonstration de la Chambre Deluxe",
    category: "chambres",
    image: "/images/rooms/deluxe-1.svg",
  },
  {
    id: "piscine-2",
    title: "Détail de l'eau",
    alt: "Illustration de démonstration du bassin et de son pourtour",
    category: "piscine",
    image: "/images/gallery/piscine-2.svg",
  },
  {
    id: "restaurant-2",
    title: "Petit-déjeuner",
    alt: "Illustration de démonstration du service du petit-déjeuner",
    category: "restaurant",
    image: "/images/gallery/restaurant-2.svg",
  },
  {
    id: "spa-2",
    title: "Salon de repos",
    alt: "Illustration de démonstration du salon de repos du spa",
    category: "spa",
    image: "/images/gallery/spa-2.svg",
  },
  {
    id: "communs-2",
    title: "Salon d'accueil",
    alt: "Illustration de démonstration du salon d'accueil",
    category: "espaces-communs",
    image: "/images/gallery/communs-2.svg",
  },
  {
    id: "standard-galerie",
    title: "Chambre Standard",
    alt: "Illustration de démonstration de la Chambre Standard",
    category: "chambres",
    image: "/images/rooms/standard-1.svg",
  },
  {
    id: "familiale-galerie",
    title: "Suite Familiale",
    alt: "Illustration de démonstration de la Suite Familiale",
    category: "chambres",
    image: "/images/rooms/familiale-1.svg",
  },
];

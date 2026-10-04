export type Room = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  currency: string;
  capacity: number;
  beds: string;
  size: number;
  amenities: string[];
  images: string[];
  imageAlts: string[];
  featured: boolean;
  available: boolean;
};

export const rooms: Room[] = [
  {
    id: "standard",
    name: "Chambre Standard",
    slug: "chambre-standard",
    shortDescription:
      "Une chambre calme sur le patio, pensée pour deux voyageurs.",
    description:
      "La Chambre Standard reprend les proportions d'une alcôve de riad : un lit double, une salle de bain privative et une fenêtre sur le patio. Le mobilier reste simple, le linge est épais, et la climatisation se règle sans bruit. Elle convient à un court séjour en médina, lorsque l'on cherche surtout le calme au retour des ruelles.",
    price: 890,
    currency: "MAD",
    capacity: 2,
    beds: "1 lit double",
    size: 22,
    amenities: [
      "Climatisation",
      "Salle de bain privative",
      "Douche à l'italienne",
      "Linge de lit et serviettes",
      "Coffre-fort",
      "Produits d'accueil",
      "Bureau",
    ],
    images: [
      "/images/rooms/standard-1.svg",
      "/images/rooms/standard-2.svg",
      "/images/rooms/standard-3.svg",
    ],
    imageAlts: [
      "Illustration de démonstration de la Chambre Standard, arcade et lit",
      "Illustration de démonstration de la Chambre Standard, détail végétal",
      "Illustration de démonstration de la Chambre Standard, coin repas",
    ],
    featured: true,
    available: true,
  },
  {
    id: "deluxe",
    name: "Chambre Deluxe",
    slug: "chambre-deluxe",
    shortDescription:
      "Plus d'espace, un coin salon et une vue dégagée sur le patio.",
    description:
      "La Chambre Deluxe ajoute un coin salon et un lit king size. La salle de bain est habillée de zellige clair, et la fenêtre haute garde la pièce lumineuse sans l'exposer à la ruelle. C'est la chambre la plus demandée pour un séjour à deux, avec assez de place pour poser les valises et rester lire après le petit-déjeuner.",
    price: 1290,
    currency: "MAD",
    capacity: 2,
    beds: "1 lit king size",
    size: 32,
    amenities: [
      "Climatisation",
      "Lit king size",
      "Coin salon",
      "Vue patio",
      "Salle de bain privative",
      "Articles de toilette",
      "Peignoirs",
      "Coffre-fort",
      "Bouilloire",
    ],
    images: [
      "/images/rooms/deluxe-1.svg",
      "/images/rooms/deluxe-2.svg",
      "/images/rooms/deluxe-3.svg",
    ],
    imageAlts: [
      "Illustration de démonstration de la Chambre Deluxe",
      "Illustration de démonstration du coin salon de la Chambre Deluxe",
      "Illustration de démonstration de la salle de bain de la Chambre Deluxe",
    ],
    featured: true,
    available: true,
  },
  {
    id: "suite",
    name: "Suite",
    slug: "suite",
    shortDescription:
      "Un salon séparé et une chambre fermée, pour un séjour plus lent.",
    description:
      "La Suite sépare le salon de la chambre. Le lit king size fait face à un mur enduit à la chaux, la baignoire est indépendante, et le salon peut accueillir le petit-déjeuner sans encombrer l'espace nuit. Elle est prévue pour deux personnes qui restent plusieurs nuits et souhaitent un vrai lieu de retrait au milieu de la médina.",
    price: 1890,
    currency: "MAD",
    capacity: 2,
    beds: "1 lit king size",
    size: 45,
    amenities: [
      "Salon séparé",
      "Lit king size",
      "Baignoire",
      "Douche",
      "Peignoirs et chaussons",
      "Coin thé",
      "Climatisation",
      "Coffre-fort",
      "Produits d'accueil",
    ],
    images: [
      "/images/rooms/suite-1.svg",
      "/images/rooms/suite-2.svg",
      "/images/rooms/suite-3.svg",
    ],
    imageAlts: [
      "Illustration de démonstration de la Suite",
      "Illustration de démonstration du salon de la Suite",
      "Illustration de démonstration de la baignoire de la Suite",
    ],
    featured: true,
    available: true,
  },
  {
    id: "familiale",
    name: "Suite Familiale",
    slug: "suite-familiale",
    shortDescription:
      "Deux espaces de nuit pour une famille ou quatre voyageurs.",
    description:
      "La Suite Familiale relie une chambre principale et un second espace avec deux lits simples. Les enfants restent à proximité sans partager le lit des parents. Un canapé permet de se retrouver, et la salle de bain est assez large pour le matin avant une sortie. La maison confirme au cas par cas les lits d'appoint et l'âge des enfants.",
    price: 2490,
    currency: "MAD",
    capacity: 4,
    beds: "1 lit king size et 2 lits simples",
    size: 62,
    amenities: [
      "Deux espaces nuit",
      "Lit king size",
      "Deux lits simples",
      "Canapé",
      "Salle de bain privative",
      "Climatisation",
      "Coffre-fort",
      "Espace bagages",
      "Petit-déjeuner en chambre sur demande",
    ],
    images: [
      "/images/rooms/familiale-1.svg",
      "/images/rooms/familiale-2.svg",
      "/images/rooms/familiale-3.svg",
    ],
    imageAlts: [
      "Illustration de démonstration de la Suite Familiale",
      "Illustration de démonstration du second espace nuit",
      "Illustration de démonstration du salon de la Suite Familiale",
    ],
    featured: true,
    available: true,
  },
];

export function getRoomBySlug(slug: string) {
  return rooms.find((room) => room.slug === slug);
}

export function getFeaturedRooms() {
  const featured = rooms.filter((room) => room.featured);
  return featured.length > 0 ? featured : rooms;
}

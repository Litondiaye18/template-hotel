export type Service = {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    id: "petit-dejeuner",
    name: "Petit-déjeuner",
    description:
      "Servi dans le patio ou en chambre, avec pains, fruits, confitures de la maison et thé à la menthe.",
    image: "/images/services/petit-dejeuner.svg",
    imageAlt: "Illustration de démonstration du petit-déjeuner servi au riad",
  },
  {
    id: "wifi",
    name: "Wi-Fi",
    description:
      "Connexion disponible dans les chambres et les espaces communs, pour travailler au calme ou préparer la journée.",
    image: "/images/services/wifi.svg",
    imageAlt: "Illustration de démonstration de la connexion Wi-Fi",
  },
  {
    id: "piscine",
    name: "Piscine",
    description:
      "Un bassin à l'échelle du patio, ouvert aux hôtes de la maison, avec serviettes et transats à l'ombre.",
    image: "/images/services/piscine.svg",
    imageAlt: "Illustration de démonstration de la piscine du patio",
  },
  {
    id: "spa",
    name: "Spa",
    description:
      "Massages et soins sur rendez-vous, dans une salle au calme. Les créneaux se confirment avec la réception.",
    image: "/images/services/spa.svg",
    imageAlt: "Illustration de démonstration de l'espace spa",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    description:
      "Cuisine de saison le soir, réservée en priorité aux hôtes. Le menu du jour se demande à l'arrivée.",
    image: "/images/services/restaurant.svg",
    imageAlt: "Illustration de démonstration du restaurant",
  },
  {
    id: "parking",
    name: "Parking",
    description:
      "Stationnement privé à proximité de la porte du riad, utile si vous arrivez en voiture. Places limitées.",
    image: "/images/services/parking.svg",
    imageAlt: "Illustration de démonstration du parking",
  },
  {
    id: "reception",
    name: "Réception 24/7",
    description:
      "Quelqu'un est présent jour et nuit pour l'arrivée, les clés et les questions de séjour.",
    image: "/images/services/reception.svg",
    imageAlt: "Illustration de démonstration de la réception",
  },
  {
    id: "navette",
    name: "Navette aéroport",
    description:
      "Transfert depuis l'aéroport de Marrakech, à réserver en même temps que la demande de chambre.",
    image: "/images/services/navette.svg",
    imageAlt: "Illustration de démonstration de la navette aéroport",
  },
  {
    id: "room-service",
    name: "Room service",
    description:
      "Boissons fraîches, thé et encas servis en chambre pendant la journée, selon les horaires de la maison.",
    image: "/images/services/room-service.svg",
    imageAlt: "Illustration de démonstration du room service",
  },
];

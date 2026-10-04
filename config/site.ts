/**
 * Configuration centrale du template.
 * Pour un nouveau client, modifiez surtout ce fichier,
 * les données dans /data et les images dans /public/images.
 */
export const siteConfig = {
  siteName: "Dar El Yasmine",
  slogan: "Un riad confidentiel, une hospitalité lumineuse",
  description:
    "Dar El Yasmine est un riad de charme à Marrakech : patio planté, chambres calmes et accueil attentionné au cœur de la médina. Les séjours se demandent directement auprès de la maison.",
  url: "https://template-hotel-eta.vercel.app",
  logo: "/images/logo/logo.svg",
  /** Passez à true si le fichier logo contient déjà le nom de l'établissement. */
  logoIncludesName: false,
  favicon: "/images/logo/favicon.svg",
  phone: "+212 524 44 18 20",
  whatsapp: "212524441820",
  email: "contact@dar-el-yasmine.example",
  address: "18 Derb El Yasmine, Quartier Riad Zitoun",
  city: "Marrakech",
  country: "Maroc",
  checkIn: "14:00",
  checkOut: "12:00",
  /** Code ISO 4217 : MAD, EUR, USD… */
  currency: "MAD",
  socialLinks: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Marrakech+Riad+Zitoun",
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?q=Marrakech%20Riad%20Zitoun&z=15&output=embed",
  theme: {
    primary: "#14352C",
    secondary: "#7A3E2A",
    accent: "#8C6A2B",
    background: "#F7F3EB",
    text: "#1A1714",
  },
  hero: {
    title: "Dar El Yasmine",
    subtitle: "Un riad confidentiel, une hospitalité lumineuse",
    description:
      "Poussez la porte d'un patio d'orangers. Les chambres restent silencieuses, et chaque séjour se confirme directement avec la maison.",
    image: "/images/hero/hero.svg",
    imageAlt:
      "Illustration de démonstration : patio en arcades de Dar El Yasmine",
  },
  cta: {
    booking: "Réserver",
    whatsapp: "Écrire sur WhatsApp",
  },
  navigation: [
    { label: "Chambres", href: "/chambres" },
    { label: "Services", href: "/services" },
    { label: "Galerie", href: "/galerie" },
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ],
  openingHours: [
    { label: "Réception", value: "Ouverte 24h/24" },
    { label: "Arrivée", value: "À partir de 14:00" },
    { label: "Départ", value: "Jusqu'à 12:00" },
    { label: "Petit-déjeuner", value: "7:00 – 10:30" },
  ],
  about: {
    eyebrow: "La maison",
    title: "Une adresse discrète, tenue comme une maison",
    paragraphs: [
      "Dar El Yasmine occupe une ancienne demeure de la médina, organisée autour d'un patio. La lumière y entre par le haut, les chambres donnent sur le calme, et le rythme du séjour reste celui des hôtes.",
      "Ce site est un template de démonstration : les textes, les tarifs et les visuels se remplacent sans toucher à l'architecture du projet. La réservation n'est pas un paiement en ligne. Elle devient une demande, envoyée sur WhatsApp, que la maison confirme elle-même.",
    ],
  },
  whyUs: [
    {
      title: "Emplacement",
      text: "Dans un derb de la médina, à quelques minutes à pied des souks, sans le bruit continu de la grande rue.",
    },
    {
      title: "Confort",
      text: "Literie soignée, salle de bain privative et climatisation dans chaque chambre, avec des volumes pensés pour se reposer.",
    },
    {
      title: "Accueil",
      text: "Une équipe réduite, joignable à toute heure, qui répond à chaque demande de séjour en personne.",
    },
    {
      title: "Services",
      text: "Petit-déjeuner, piscine, spa, restaurant et navette : l'essentiel du séjour, proposé sans mise en scène inutile.",
    },
  ],
  reservationNotice:
    "Votre demande de réservation va être envoyée à l'hôtel pour confirmation.",
} as const;

export type SiteConfig = typeof siteConfig;

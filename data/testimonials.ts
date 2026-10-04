/**
 * Données de démonstration uniquement.
 * Ces textes ne sont pas de véritables avis clients.
 * Remplacez-les ou retirez la section avant une mise en production
 * si vous ne disposez pas d'autorisations écrites.
 */
export type Testimonial = {
  id: string;
  quote: string;
  label: string;
  context: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "exemple-1",
    quote:
      "Exemple de formulation : le patio était silencieux le soir, et le petit-déjeuner arrivait sans que l'on ait à le réclamer.",
    label: "Exemple A",
    context: "Séjour de démonstration · 3 nuits",
  },
  {
    id: "exemple-2",
    quote:
      "Exemple de formulation : la chambre donnait sur l'intérieur, ce qui a changé le séjour après des journées dans les souks.",
    label: "Exemple B",
    context: "Séjour de démonstration · 2 nuits",
  },
  {
    id: "exemple-3",
    quote:
      "Exemple de formulation : la demande envoyée sur WhatsApp a reçu une réponse claire, avec les horaires d'arrivée et le transfert.",
    label: "Exemple C",
    context: "Séjour de démonstration · en famille",
  },
];

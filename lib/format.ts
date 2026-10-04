export function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCapacity(count: number) {
  return count > 1 ? `${count} personnes` : `${count} personne`;
}

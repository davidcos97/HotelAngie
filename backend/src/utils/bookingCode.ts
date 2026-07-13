export function generateBookingCode(): string {
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  const year = new Date().getFullYear();
  return `614-${year}-${random}`;
}

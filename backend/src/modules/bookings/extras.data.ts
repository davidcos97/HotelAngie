export interface ExtraDefinition {
  id: string;
  label: string;
  price: number;
  perNight?: boolean;
  perGuest?: boolean;
}

export const EXTRAS: ExtraDefinition[] = [
  { id: "breakfast", label: "Desayuno buffet", price: 35000, perNight: true, perGuest: true },
  { id: "early-checkin", label: "Early check-in (10:00 am)", price: 50000 },
  { id: "late-checkout", label: "Late check-out (16:00)", price: 50000 },
  { id: "parking", label: "Parking privado", price: 25000, perNight: true },
  { id: "decoration", label: "Decoración especial", price: 80000 }
];

export const TAX_RATE = 0.19;

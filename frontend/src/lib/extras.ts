export interface Extra {
  id: string;
  label: string;
  description: string;
  price: number;
  perNight?: boolean;
  perGuest?: boolean;
}

export const EXTRAS: Extra[] = [
  { id: "breakfast", label: "Desayuno buffet", description: "Por persona, por día", price: 35000, perNight: true, perGuest: true },
  { id: "early-checkin", label: "Early check-in (10:00 am)", description: "Cargo único", price: 50000 },
  { id: "late-checkout", label: "Late check-out (16:00)", description: "Cargo único", price: 50000 },
  { id: "parking", label: "Parking privado", description: "Por noche", price: 25000, perNight: true },
  { id: "decoration", label: "Decoración especial", description: "Aniversarios y cumpleaños", price: 80000 }
];

export const TAX_RATE = 0.19;

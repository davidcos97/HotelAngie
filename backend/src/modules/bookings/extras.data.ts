export interface ExtraDefinition {
  id: string;
  label: string;
  price: number;
  perNight?: boolean;
  perGuest?: boolean;
}

export const EXTRAS: ExtraDefinition[] = [
  { id: "early-checkin", label: "Early check-in (10:00 am)", price: 50000 },
  { id: "late-checkout", label: "Late check-out (16:00)", price: 50000 },
  { id: "laundry-service", label: "Servicio de lavandería incluido", price: 45000 },
  { id: "welcome-kit", label: "Kit de bienvenida", price: 35000 },
  { id: "decoration", label: "Decoración especial", price: 80000 }
];

export const TAX_RATE = 0.19;

export interface Extra {
  id: string;
  label: string;
  description: string;
  price: number;
  perNight?: boolean;
  perGuest?: boolean;
}

export const EXTRAS: Extra[] = [
  { id: "early-checkin", label: "Early check-in (10:00 am)", description: "Cargo único", price: 50000 },
  { id: "late-checkout", label: "Late check-out (16:00)", description: "Cargo único", price: 50000 },
  { id: "laundry-service", label: "Servicio de lavandería incluido", description: "Te lavamos y doblamos la ropa, sin usar el monedero", price: 45000 },
  { id: "welcome-kit", label: "Kit de bienvenida", description: "Snacks y detalles de la región", price: 35000 },
  { id: "decoration", label: "Decoración especial", description: "Aniversarios y cumpleaños", price: 80000 }
];

export const TAX_RATE = 0.19;

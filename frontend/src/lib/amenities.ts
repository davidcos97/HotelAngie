import {
  Wifi,
  Tv,
  Snowflake,
  Wine,
  ShieldCheck,
  Bath,
  DoorOpen,
  Laptop,
  Waves,
  ChefHat,
  Clapperboard,
  type LucideIcon
} from "lucide-react";

export const AMENITY_MAP: Record<string, { label: string; icon: LucideIcon }> = {
  wifi: { label: "Wifi de alta velocidad", icon: Wifi },
  tv: { label: "Smart TV", icon: Tv },
  netflix: { label: "Netflix incluido", icon: Clapperboard },
  ac: { label: "Aire acondicionado", icon: Snowflake },
  minibar: { label: "Mini bar", icon: Wine },
  safe: { label: "Caja fuerte", icon: ShieldCheck },
  bathroom: { label: "Baño privado", icon: Bath },
  balcony: { label: "Balcón privado", icon: DoorOpen },
  desk: { label: "Escritorio de trabajo", icon: Laptop },
  coworking: { label: "Acceso a coworking", icon: Laptop },
  jacuzzi: { label: "Jacuzzi privado", icon: Waves },
  kitchen: { label: "Cocina completa", icon: ChefHat }
};

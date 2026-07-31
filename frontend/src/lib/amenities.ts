import {
  Wifi,
  Tv,
  Snowflake,
  Bath,
  Shirt,
  KeyRound,
  ChefHat,
  type LucideIcon
} from "lucide-react";

export const AMENITY_MAP: Record<string, { label: string; icon: LucideIcon }> = {
  wifi: { label: "Wifi de alta velocidad", icon: Wifi },
  tv: { label: "Smart TV", icon: Tv },
  ac: { label: "Aire acondicionado", icon: Snowflake },
  bathroom: { label: "Baño privado", icon: Bath },
  closet: { label: "Closet", icon: Shirt },
  cardAccess: { label: "Acceso con tarjeta de seguridad", icon: KeyRound },
  kitchen: { label: "Cocina equipada", icon: ChefHat }
};

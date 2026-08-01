export interface BrandAsset {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export type BrandAssetKey =
  | "lobby"
  | "signage"
  | "glassDoor"
  | "towel"
  | "welcomeMat"
  | "deskObjects"
  | "welcomeScreen"
  | "logoMark";

/**
 * Fotografía real de marca 6/14 Co-Living, recortada del material de branding
 * oficial y optimizada a WebP. Fuente: frontend/public/assets/brand/.
 */
export const BRAND_ASSETS: Record<BrandAssetKey, BrandAsset> = {
  lobby: {
    id: "lobby",
    src: "/assets/brand/lobby-614-coliving.webp",
    alt: "Lobby de 6/14 Co-Living con acabados en madera clara, concreto y plantas",
    category: "Espacios"
  },
  signage: {
    id: "signage",
    src: "/assets/brand/signage-614-coliving.webp",
    alt: "Señalización iluminada del logo 6/14 Co-Living sobre pared de concreto",
    category: "Marca"
  },
  glassDoor: {
    id: "glassDoor",
    src: "/assets/brand/glass-door-614-coliving.webp",
    alt: "Vinilo del logo 6/14 Co-Living en la puerta de vidrio de la sala común",
    category: "Marca"
  },
  towel: {
    id: "towel",
    src: "/assets/brand/towel-614-coliving.webp",
    alt: "Toalla blanca bordada con el logo 6/14 Co-Living",
    category: "Marca"
  },
  welcomeMat: {
    id: "welcomeMat",
    src: "/assets/brand/welcome-mat-614-coliving.webp",
    alt: "Tapete de bienvenida con el logo 6/14 Co-Living en la entrada",
    category: "Marca"
  },
  deskObjects: {
    id: "deskObjects",
    src: "/assets/brand/desk-objects-614-coliving.webp",
    alt: "Libreta y taza corporativa 6/14 Co-Living sobre un escritorio de madera",
    category: "Marca"
  },
  welcomeScreen: {
    id: "welcomeScreen",
    src: "/assets/brand/welcome-screen-614-coliving.webp",
    alt: "Pantalla digital de bienvenida con el logo 6/14 Co-Living",
    category: "Marca"
  },
  logoMark: {
    id: "logoMark",
    src: "/assets/brand/logo-mark-614-coliving.webp",
    alt: "Logotipo oficial de 6/14 Co-Living",
    category: "Marca"
  }
};

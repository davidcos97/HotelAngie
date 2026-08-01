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
  | "welcomeScreen";

/**
 * Fotografía real de marca 6/14 Co-Living pendiente de subir.
 * Mientras tanto se usa una imagen de referencia visualmente coherente.
 * Reemplazar `src` por el archivo definitivo (ver README de assets) sin tocar
 * los componentes que consumen este registro.
 */
export const BRAND_ASSETS: Record<BrandAssetKey, BrandAsset> = {
  lobby: {
    id: "lobby",
    src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=2000&q=80",
    alt: "Lobby de 6/14 Co-Living con acabados en madera clara, concreto y plantas",
    category: "Espacios"
  },
  signage: {
    id: "signage",
    src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1400&q=80",
    alt: "Señalización iluminada del logo 6/14 Co-Living sobre pared de concreto",
    category: "Marca"
  },
  glassDoor: {
    id: "glassDoor",
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
    alt: "Vinilo del logo 6/14 Co-Living en la puerta de vidrio de la sala común",
    category: "Marca"
  },
  towel: {
    id: "towel",
    src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=1000&q=80",
    alt: "Toalla blanca bordada con el logo 6/14 Co-Living",
    category: "Marca"
  },
  welcomeMat: {
    id: "welcomeMat",
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
    alt: "Tapete de bienvenida con el logo 6/14 Co-Living en la entrada",
    category: "Marca"
  },
  deskObjects: {
    id: "deskObjects",
    src: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1400&q=80",
    alt: "Libreta y taza corporativa 6/14 Co-Living sobre un escritorio de madera",
    category: "Marca"
  },
  welcomeScreen: {
    id: "welcomeScreen",
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
    alt: "Pantalla digital de bienvenida con el logo 6/14 Co-Living",
    category: "Marca"
  }
};

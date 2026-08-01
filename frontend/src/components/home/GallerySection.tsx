import SectionHeading from "@/components/shared/SectionHeading";
import Gallery from "@/components/shared/Gallery";
import { BRAND_ASSETS } from "@/lib/brandAssets";

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80", alt: "Habitación Lago", category: "Habitaciones" },
  { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80", alt: "Cocina de una habitación", category: "Cocinas" },
  { src: "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1000&q=80", alt: "Habitación Bosque", category: "Habitaciones" },
  { src: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=80", alt: "Acceso con tarjeta de seguridad", category: "Seguridad" },
  { src: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=1000&q=80", alt: "Zona de lavandería", category: "Lavandería" },
  { src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80", alt: "Habitación Brisa", category: "Habitaciones" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80", alt: "Zona común", category: "Interiores" },
  { src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80", alt: "Parque del lago en Pereira", category: "Alrededores" },
  { src: BRAND_ASSETS.towel.src, alt: BRAND_ASSETS.towel.alt, category: "Marca" },
  { src: BRAND_ASSETS.welcomeMat.src, alt: BRAND_ASSETS.welcomeMat.alt, category: "Marca" },
  { src: BRAND_ASSETS.welcomeScreen.src, alt: BRAND_ASSETS.welcomeScreen.alt, category: "Marca" }
];

export default function GallerySection() {
  return (
    <section className="bg-charcoal-50/40 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading label="Galería" title="Un vistazo a 6/14" description="Espacios diseñados para inspirar tu estadía." />
        <div className="mt-12">
          <Gallery images={GALLERY_IMAGES} />
        </div>
      </div>
    </section>
  );
}

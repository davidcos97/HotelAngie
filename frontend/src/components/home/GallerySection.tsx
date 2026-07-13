import SectionHeading from "@/components/shared/SectionHeading";
import Gallery from "@/components/shared/Gallery";

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80", alt: "Habitación Studio Dorado", category: "Habitaciones" },
  { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80", alt: "Suite Skyline", category: "Habitaciones" },
  { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80", alt: "Piscina rooftop", category: "Rooftop" },
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80", alt: "Restaurante", category: "Restaurante" },
  { src: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=1000&q=80", alt: "Coworking", category: "Coworking" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80", alt: "Bar rooftop", category: "Rooftop" },
  { src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1000&q=80", alt: "Lobby", category: "Interiores" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80", alt: "Vista de la ciudad", category: "Rooftop" }
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

import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/shared/ScrollReveal";

const EXPERIENCES = [
  {
    label: "Restaurante",
    title: "Cocina de autor con producto local",
    description:
      "Nuestro restaurante abre de 7:00 a 22:00 con una carta que celebra ingredientes colombianos, coctelería de firma y servicio a la habitación 24 horas.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=80"
  },
  {
    label: "Rooftop & piscina",
    title: "Piscina infinita con vista a la ciudad",
    description:
      "En el último piso, nuestra piscina infinita y bar rooftop son el punto de encuentro perfecto para el atardecer, abierto hasta las 22:00.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80"
  },
  {
    label: "Eventos",
    title: "Espacios para eventos privados y de comunidad",
    description:
      "Desde cine al aire libre hasta lanzamientos corporativos: contamos con espacios flexibles para hasta 60 personas con producción incluida.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
  }
];

export default function ExperiencesSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading align="center" label="Experiencias" title="Más que una habitación" />

        <div className="mt-14 space-y-20">
          {EXPERIENCES.map((exp, i) => (
            <ScrollReveal key={exp.label}>
              <div className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft">
                  <Image src={exp.image} alt={exp.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                </div>
                <div>
                  <span className="section-label">
                    <span className="divider-gold" /> {exp.label}
                  </span>
                  <h3 className="section-title">{exp.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-charcoal-700/80">{exp.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

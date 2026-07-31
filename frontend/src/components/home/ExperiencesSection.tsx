import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/shared/ScrollReveal";

const EXPERIENCES = [
  {
    label: "Ubicación",
    title: "A pasos del Parque Bolívar y de una estación de MegaBús",
    description:
      "Estamos en el centro de Pereira, muy cerca del Parque Bolívar y de una estación de MegaBús, para que te muevas por la ciudad sin complicaciones.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=80"
  },
  {
    label: "Lavandería",
    title: "Lavandería con monedero, disponible cuando la necesites",
    description:
      "Sin filas ni reservas: la zona de lavandería está disponible para todos los huéspedes en cualquier momento de su estadía.",
    image: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=1400&q=80"
  },
  {
    label: "Seguridad",
    title: "Tu tranquilidad, primero",
    description:
      "Cada habitación tiene acceso mediante tarjeta y contamos con un sistema de cámaras privado en las zonas comunes del edificio.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=80"
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

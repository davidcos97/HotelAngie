import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Users2, Sparkles, Globe2 } from "lucide-react";
import { HOTEL } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Conoce la historia y los valores detrás de ${HOTEL.name}.`,
  alternates: { canonical: "/nosotros" }
};

const VALUES = [
  { icon: Heart, title: "Hospitalidad genuina", description: "Cada huésped es parte de la familia 6/14 desde el primer saludo." },
  { icon: Users2, title: "Comunidad real", description: "Creamos espacios y eventos que conectan viajeros, locales y creadores." },
  { icon: Sparkles, title: "Diseño con propósito", description: "Cada rincón está pensado para inspirar calma, foco y creatividad." },
  { icon: Globe2, title: "Mentalidad global", description: "Recibimos huéspedes de todo el mundo con la misma calidez paisa." }
];

export default function AboutPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeading
              label="Nuestra historia"
              title="Un co-living nacido de una idea simple"
              description={`${HOTEL.name} nació en 2023 con una convicción: viajar no debería significar sentirse solo. Convertimos una casa republicana en El Poblado en un hogar compartido para nómadas digitales, creativos y viajeros curiosos.`}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft">
              <Image
                src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=80"
                alt="Lobby de 6/14 Co-Living"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-24">
          <SectionHeading align="center" label="Nuestros valores" title="Lo que nos define" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.08}>
                <div className="card-elevated flex h-full flex-col items-center p-7 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-charcoal-950">
                    <value.icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-charcoal-950">{value.title}</h3>
                  <p className="mt-1.5 text-sm text-charcoal-700/70">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

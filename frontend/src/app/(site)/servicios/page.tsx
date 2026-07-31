import type { Metadata } from "next";
import * as Icons from "lucide-react";
import { SERVICES, HOTEL } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Servicios",
  description: `Descubre todos los servicios de ${HOTEL.name}: wifi, cocina en habitaciones seleccionadas, lavandería y más.`,
  alternates: { canonical: "/servicios" }
};

export default function ServicesPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading align="center" label="Servicios" title="Una experiencia completa" description="Todo lo que necesitas para vivir, trabajar y descansar bajo un mismo techo." />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] ?? Icons.Sparkles;
            return (
              <ScrollReveal key={service.title} delay={i * 0.05}>
                <div className="card-elevated flex h-full flex-col p-7">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-charcoal-950">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-charcoal-950">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-700/75">{service.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

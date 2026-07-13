import * as Icons from "lucide-react";
import { SERVICES } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function ServicesSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          align="center"
          label="Servicios"
          title="Todo lo que necesitas, bajo un mismo techo"
          description="Pensado para huéspedes de negocios, ocio y estadías prolongadas."
        />

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] ?? Icons.Sparkles;
            return (
              <ScrollReveal key={service.title} delay={i * 0.05}>
                <div className="group flex h-full flex-col items-center rounded-2xl border border-charcoal-900/5 bg-white p-6 text-center shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-gold">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-charcoal-950 transition-transform group-hover:scale-110">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-charcoal-950">{service.title}</h3>
                  <p className="mt-1.5 text-sm text-charcoal-700/70">{service.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

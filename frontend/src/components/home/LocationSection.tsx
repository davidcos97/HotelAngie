import { Bus, MapPin, Plane } from "lucide-react";
import { HOTEL } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/shared/ScrollReveal";

const HIGHLIGHTS = [
  { icon: Bus, label: "3 min", description: "a una estación de MegaBús" },
  { icon: MapPin, label: "5 min", description: "al Parque Bolívar" },
  { icon: Plane, label: "20 min", description: "al Aeropuerto Internacional Matecaña" }
];

export default function LocationSection() {
  return (
    <section className="bg-charcoal-950 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <ScrollReveal>
          <SectionHeading light label="Ubicación" title="En el centro de Pereira, junto al Parque Bolívar" description={HOTEL.address} />
          <div className="mt-8 grid grid-cols-3 gap-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.description} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                <h.icon className="mx-auto mb-2 text-gold-400" size={20} />
                <p className="font-display text-xl font-semibold text-white">{h.label}</p>
                <p className="text-xs text-white/60">{h.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-soft">
            <iframe
              title="Ubicación 6/14 Co-Living en Google Maps"
              src={HOTEL.mapEmbed}
              width="100%"
              height="380"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

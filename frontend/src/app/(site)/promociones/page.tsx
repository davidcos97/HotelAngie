import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "lucide-react";
import { PROMOTIONS, HOTEL } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const metadata: Metadata = {
  title: "Promociones",
  description: `Tarifas especiales y promociones activas en ${HOTEL.name}.`,
  alternates: { canonical: "/promociones" }
};

export default function PromotionsPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading label="Ofertas" title="Promociones activas" description="Aplica el código al momento de reservar o menciónalo por WhatsApp." />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROMOTIONS.map((promo, i) => (
            <ScrollReveal key={promo.id} delay={i * 0.1}>
              <div className="card-elevated overflow-hidden">
                <div className="relative aspect-[5/3] overflow-hidden">
                  <Image src={promo.image} alt={promo.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                  <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-gold-gradient px-3 py-1 text-xs font-bold text-charcoal-950">
                    <Tag size={12} /> -{promo.discount}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-charcoal-950">{promo.title}</h3>
                  <p className="mt-2 text-sm text-charcoal-700/75">{promo.description}</p>
                  <p className="mt-3 text-xs text-charcoal-700/50">Válido hasta {format(new Date(promo.validUntil), "d 'de' MMMM yyyy", { locale: es })}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-md bg-charcoal-950/5 px-2.5 py-1 font-mono text-xs font-semibold tracking-wider text-charcoal-800">{promo.code}</span>
                    <Link href="/reservas" className="text-sm font-semibold text-gold-700 hover:text-gold-800">Reservar →</Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

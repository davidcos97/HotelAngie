import type { Metadata } from "next";
import { HOTEL } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  alternates: { canonical: "/terminos" },
  robots: { index: false }
};

export default function TermsPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading label="Legal" title="Términos y condiciones" />
        <div className="prose prose-neutral mt-10 max-w-none text-sm leading-relaxed text-charcoal-700/85">
          <p>
            Al reservar en {HOTEL.name} aceptas nuestras políticas de check-in ({HOTEL.checkIn}) y check-out ({HOTEL.checkOut}), cancelación
            gratuita hasta 48 horas antes de la llegada, y el uso responsable de las áreas comunes y privadas del co-living.
          </p>
          <p>
            Los precios publicados están sujetos a disponibilidad y pueden variar según temporada. Las promociones no son acumulables
            entre sí. Para más información contáctanos en {HOTEL.email}.
          </p>
        </div>
      </div>
    </div>
  );
}

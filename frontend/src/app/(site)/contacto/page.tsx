import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { HOTEL } from "@/lib/data";
import ContactForm from "@/components/shared/ContactForm";
import SectionHeading from "@/components/shared/SectionHeading";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contáctanos para reservas, cotizaciones o eventos en ${HOTEL.name}.`,
  alternates: { canonical: "/contacto" }
};

export default function ContactPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading label="Contacto" title="Estamos para ayudarte" description="Reservas, cotizaciones, eventos o simplemente saludar." />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="card-elevated p-7">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <a href={`mailto:${HOTEL.email}`} className="card-elevated flex items-center gap-3 p-5 text-sm text-charcoal-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600"><Mail size={18} /></span>
                {HOTEL.email}
              </a>
              <a href={`tel:${HOTEL.phone}`} className="card-elevated flex items-center gap-3 p-5 text-sm text-charcoal-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600"><Phone size={18} /></span>
                {HOTEL.phone}
              </a>
              <a
                href={whatsappLink(HOTEL.whatsapp, "Hola. Quiero información sobre una habitación.")}
                target="_blank"
                rel="noopener noreferrer"
                className="card-elevated flex items-center gap-3 p-5 text-sm text-charcoal-800"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]"><Phone size={18} /></span>
                WhatsApp directo
              </a>
              <div className="card-elevated flex items-center gap-3 p-5 text-sm text-charcoal-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600"><Clock size={18} /></span>
                Check-in {HOTEL.checkIn} · Check-out {HOTEL.checkOut}
              </div>
            </div>

            <div className="card-elevated flex items-start gap-3 p-5 text-sm text-charcoal-800">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold-600" /> {HOTEL.address}
            </div>

            <div className="overflow-hidden rounded-2xl border border-charcoal-900/5 shadow-soft">
              <iframe title="Mapa 6/14 Co-Living" src={HOTEL.mapEmbed} width="100%" height="320" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

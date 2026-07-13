import { Mail, Phone, MapPin } from "lucide-react";
import { HOTEL } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";
import ContactForm from "@/components/shared/ContactForm";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function ContactSection() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <ScrollReveal>
          <SectionHeading label="Contacto" title="Hablemos de tu próxima estadía" description="Escríbenos y te responderemos en menos de 24 horas." />
          <div className="mt-8 space-y-4">
            <a href={`mailto:${HOTEL.email}`} className="flex items-center gap-3 text-sm text-charcoal-700 hover:text-gold-700">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600"><Mail size={18} /></span>
              {HOTEL.email}
            </a>
            <a href={`tel:${HOTEL.phone}`} className="flex items-center gap-3 text-sm text-charcoal-700 hover:text-gold-700">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600"><Phone size={18} /></span>
              {HOTEL.phone}
            </a>
            <p className="flex items-center gap-3 text-sm text-charcoal-700">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-600"><MapPin size={18} /></span>
              {HOTEL.address}
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15} className="card-elevated p-7">
          <ContactForm />
        </ScrollReveal>
      </div>
    </section>
  );
}

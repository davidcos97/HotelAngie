import Link from "next/link";
import { FAQS } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";
import Accordion from "@/components/shared/Accordion";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function FaqPreview() {
  return (
    <section className="bg-charcoal-50/40 py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading align="center" label="Preguntas frecuentes" title="¿Tienes dudas? Empecemos por aquí" />
        <ScrollReveal className="mt-12">
          <Accordion items={FAQS.slice(0, 5)} />
        </ScrollReveal>
        <div className="mt-8 text-center">
          <Link href="/faq" className="text-sm font-semibold text-gold-700 hover:text-gold-800">
            Ver todas las preguntas →
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { FAQS, HOTEL } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";
import Accordion from "@/components/shared/Accordion";
import { FaqJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: `Resolvemos tus dudas sobre reservas, check-in, políticas y servicios de ${HOTEL.name}.`,
  alternates: { canonical: "/faq" }
};

export default function FaqPage() {
  const categories = Array.from(new Set(FAQS.map((f) => f.category)));

  return (
    <div className="pb-24 pt-32">
      <FaqJsonLd faqs={FAQS} />
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading align="center" label="FAQ" title="Preguntas frecuentes" description="Todo lo que necesitas saber antes de tu estadía." />

        <div className="mt-12 space-y-10">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">{category}</h2>
              <Accordion items={FAQS.filter((f) => f.category === category)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

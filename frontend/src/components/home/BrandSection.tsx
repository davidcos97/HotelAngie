import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { BRAND_ASSETS } from "@/lib/brandAssets";

export default function BrandSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          align="center"
          label="Nuestra marca"
          title="El detalle que reconoces en cada rincón"
          description="Dorado, concreto y madera clara: la misma identidad que ves en el sitio te espera en el edificio."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:grid-rows-2">
          <ScrollReveal className="group relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-3xl shadow-soft lg:aspect-auto">
            <Image
              src={BRAND_ASSETS.signage.src}
              alt={BRAND_ASSETS.signage.alt}
              fill
              loading="lazy"
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 via-transparent to-transparent" />
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="group relative col-span-2 aspect-[3/2] overflow-hidden rounded-3xl border border-gold-500/15 bg-white shadow-soft lg:aspect-auto">
            <Image
              src={BRAND_ASSETS.logoMark.src}
              alt={BRAND_ASSETS.logoMark.alt}
              fill
              loading="lazy"
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="group relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl shadow-soft lg:aspect-auto">
            <Image
              src={BRAND_ASSETS.glassDoor.src}
              alt={BRAND_ASSETS.glassDoor.alt}
              fill
              loading="lazy"
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 via-transparent to-transparent" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

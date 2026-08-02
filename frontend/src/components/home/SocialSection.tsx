import { Facebook, Instagram, ArrowUpRight } from "lucide-react";
import { HOTEL } from "@/lib/data";
import SectionHeading from "@/components/shared/SectionHeading";
import ScrollReveal from "@/components/shared/ScrollReveal";

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    handle: "6/14 Co-Living",
    description: "Novedades, promociones y la comunidad de 6/14 en un solo lugar.",
    href: HOTEL.social.facebook,
    icon: Facebook
  },
  {
    label: "Instagram",
    handle: "@coliving.pereira",
    description: "Fotos y videos de las habitaciones, el edificio y la vida en 6/14.",
    href: HOTEL.social.instagram,
    icon: Instagram
  }
];

export default function SocialSection() {
  return (
    <section className="bg-charcoal-950 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          align="center"
          light
          label="Síguenos"
          title="Únete a la comunidad 6/14"
          description="Todo lo que pasa en el edificio, primero en nuestras redes."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {SOCIAL_LINKS.map((social, i) => (
            <ScrollReveal key={social.label} delay={i * 0.1}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Síguenos en ${social.label} — se abre en una pestaña nueva`}
                className="group flex h-full items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:border-gold-500/40 hover:bg-white/10"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-charcoal-950 transition-transform duration-300 group-hover:scale-110">
                  <social.icon size={28} />
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-1.5 font-display text-xl font-semibold text-white">
                    {social.label}
                    <ArrowUpRight size={18} className="text-gold-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-gold-400">{social.handle}</span>
                  <span className="mt-2 block text-sm text-white/60">{social.description}</span>
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

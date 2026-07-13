import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Youtube, MapPin, Mail, Phone, Clock } from "lucide-react";
import { HOTEL } from "@/lib/data";

const SITEMAP = [
  { label: "Habitaciones", href: "/habitaciones" },
  { label: "Reservas", href: "/reservas" },
  { label: "Servicios", href: "/servicios" },
  { label: "Promociones", href: "/promociones" },
  { label: "Blog", href: "/blog" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "FAQ", href: "/faq" },
  { label: "Contacto", href: "/contacto" }
];

const LEGAL = [
  { label: "Políticas del hotel", href: "/faq" },
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Política de privacidad", href: "/privacidad" }
];

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-charcoal-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-2.5">
            <Image src="/assets/logo/logo-emblem.svg" alt="" width={48} height={48} className="h-12 w-12" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl font-semibold text-white">6/14</span>
              <span className="text-[10px] font-medium tracking-[0.35em] text-gold-400">CO-LIVING</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-charcoal-100/70">{HOTEL.description}</p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: Instagram, href: HOTEL.social.instagram, label: "Instagram" },
              { icon: Facebook, href: HOTEL.social.facebook, label: "Facebook" },
              { icon: Youtube, href: HOTEL.social.youtube, label: "YouTube" }
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gold-400 transition-colors hover:border-gold-500 hover:bg-gold-500/10"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">Menú</h3>
          <ul className="space-y-2.5">
            {SITEMAP.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-charcoal-100/70 transition-colors hover:text-gold-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">Contacto</h3>
          <ul className="space-y-3 text-sm text-charcoal-100/70">
            <li className="flex gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" /> {HOTEL.address}
            </li>
            <li className="flex gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold-400" /> {HOTEL.phone}
            </li>
            <li className="flex gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-gold-400" /> {HOTEL.email}
            </li>
            <li className="flex gap-2.5">
              <Clock size={16} className="mt-0.5 shrink-0 text-gold-400" /> Check-in {HOTEL.checkIn} · Check-out {HOTEL.checkOut}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">Ubicación</h3>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <iframe
              title="Mapa 6/14 Co-Living"
              src={HOTEL.mapEmbed}
              width="100%"
              height="150"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale invert-[.9] contrast-[.9]"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-charcoal-100/50 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} {HOTEL.legalName}. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            {LEGAL.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-gold-400">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

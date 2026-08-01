"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/context/CurrencyContext";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/habitaciones", label: "Habitaciones" },
  { href: "/servicios", label: "Servicios" },
  { href: "/promociones", label: "Promociones" },
  { href: "/blog", label: "Blog" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacto", label: "Contacto" }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { currency, toggleCurrency } = useCurrency();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-panel border-b border-charcoal-900/5 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${"6/14 Co-Living"} — inicio`}>
          <Image src="/assets/logo/logo-icon-real.webp" alt="" width={266} height={237} priority className="h-10 w-auto lg:h-11" />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-xl font-semibold tracking-wide text-charcoal-950">6/14</span>
            <span className="text-[10px] font-medium tracking-[0.35em] text-gold-600">CO-LIVING</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide text-charcoal-700 transition-colors hover:text-gold-600",
                pathname === link.href && "text-gold-600"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleCurrency}
            className="hidden items-center gap-1.5 rounded-full border border-charcoal-900/10 px-3 py-1.5 text-xs font-semibold text-charcoal-700 transition-colors hover:border-gold-500 hover:text-gold-700 sm:flex"
            aria-label="Cambiar moneda"
          >
            <Coins size={14} /> {currency}
          </button>
          <Link href="/reservas" className="btn-gold hidden lg:inline-flex">
            Reservar ahora
          </Link>
          <button
            className="rounded-full p-2 text-charcoal-900 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden glass-panel border-t border-charcoal-900/5 lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Navegación móvil">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal-800 hover:bg-gold-50 hover:text-gold-700",
                    pathname === link.href && "bg-gold-50 text-gold-700"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/reservas" className="btn-gold mt-2 w-full">
                Reservar ahora
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

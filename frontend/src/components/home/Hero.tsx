"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SearchWidget from "./SearchWidget";
import { BRAND_ASSETS } from "@/lib/brandAssets";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal-950">
      <motion.div className="absolute inset-x-0 -inset-y-[10%]" style={{ y: parallaxY }}>
        <Image
          src={BRAND_ASSETS.lobby.src}
          alt={BRAND_ASSETS.lobby.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-charcoal-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/70 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start px-5 pt-28 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-gold-300 backdrop-blur-sm"
        >
          Co-living de autor · Pereira, Risaralda
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          Vive, comparte <span className="gold-text">y pertenece</span> en 6/14
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-xl text-balance text-base leading-relaxed text-white/75 sm:text-lg"
        >
          Habitaciones privadas con acceso por tarjeta, algunas con cocina propia, a pasos del Parque Bolívar y de una estación de MegaBús, en el centro de Pereira.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Link href="/reservas" className="btn-gold">
            Reservar ahora
          </Link>
          <Link href="/habitaciones" className="btn-outline !border-white/30 !bg-white/5 !text-white hover:!text-gold-300">
            Ver habitaciones
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-12 w-full pb-16"
        >
          <SearchWidget />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-white/50"
      >
        <ChevronDown />
      </motion.div>
    </section>
  );
}

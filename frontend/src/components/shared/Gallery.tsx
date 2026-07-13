"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
}

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const categories = Array.from(new Set(images.map((i) => i.category).filter(Boolean))) as string[];
  const [active, setActive] = useState<string>("Todas");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = active === "Todas" ? images : images.filter((i) => i.category === active);

  return (
    <div>
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {["Todas", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-colors",
                active === cat
                  ? "border-gold-600 bg-gold-gradient text-charcoal-950"
                  : "border-charcoal-900/10 text-charcoal-700 hover:border-gold-500"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((img, i) => (
          <button
            key={img.src + i}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal-950/0 transition-colors group-hover:bg-charcoal-950/30">
              <Expand className="scale-0 text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100" />
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-950/95 p-4"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute right-5 top-5 text-white/80 hover:text-gold-400"
              aria-label="Cerrar galería"
            >
              <X size={28} />
            </button>
            <button
              onClick={() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length))}
              className="absolute left-3 text-white/80 hover:text-gold-400 sm:left-8"
              aria-label="Anterior"
            >
              <ChevronLeft size={36} />
            </button>
            <div className="relative aspect-video w-full max-w-4xl">
              <Image
                src={filtered[lightboxIndex]!.src}
                alt={filtered[lightboxIndex]!.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length))}
              className="absolute right-3 text-white/80 hover:text-gold-400 sm:right-8"
              aria-label="Siguiente"
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

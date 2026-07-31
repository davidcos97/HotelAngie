"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Car, X, MapPinned, Clock } from "lucide-react";

const TRANSPORT_OPTIONS = [
  { title: "Uber", description: "Servicio disponible en toda la ciudad. Pide tu viaje directo desde la app apenas llegues." },
  { title: "Taxis", description: "Puedes tomar un taxi en la calle o pedirlo por app; el punto más cercano está a pocos minutos." },
  { title: "Buses urbanos", description: "Varias rutas del transporte público de Pereira pasan cerca del alojamiento." }
];

const TOURISM_OPTIONS = [
  { title: "Valle de Cocora, Salento", time: "≈ 1h 15 min" },
  { title: "Termales de Santa Rosa de Cabal", time: "≈ 45 min" },
  { title: "Jardín Botánico UTP", time: "≈ 15 min" },
  { title: "Bioparque Ukumarí", time: "≈ 30 min" },
  { title: "Zona Rosa (Avenida Circunvalar)", time: "≈ 10 min" }
];

export default function TransportButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.85, type: "spring", stiffness: 200, damping: 15 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar transporte y turismo" : "Ver transporte y turismo"}
        className="fixed bottom-24 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-charcoal-950 text-gold-400 shadow-gold transition-transform hover:scale-110 sm:bottom-28 sm:left-8"
      >
        {open ? <X size={24} /> : <Car size={24} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-[10.5rem] left-6 z-40 max-h-[28rem] w-[22rem] max-w-[90vw] overflow-y-auto rounded-2xl border border-charcoal-900/10 bg-white shadow-2xl sm:bottom-[11.5rem] sm:left-8"
            role="dialog"
            aria-label="Transporte y turismo"
          >
            <div className="sticky top-0 flex items-center gap-2 bg-charcoal-950 px-4 py-3.5 text-white">
              <Car size={18} className="text-gold-400" />
              <div>
                <p className="text-sm font-semibold">Transporte y turismo</p>
                <p className="text-[11px] text-white/60">Cómo moverte y qué conocer en Pereira</p>
              </div>
            </div>

            <div className="p-4">
              <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-700">
                <MapPinned size={13} /> Cómo moverte
              </h4>
              <div className="mb-4 space-y-2.5">
                {TRANSPORT_OPTIONS.map((t) => (
                  <div key={t.title} className="rounded-xl bg-charcoal-50/60 px-3.5 py-2.5">
                    <p className="text-sm font-medium text-charcoal-950">{t.title}</p>
                    <p className="text-xs text-charcoal-700/70">{t.description}</p>
                  </div>
                ))}
              </div>

              <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-700">
                <Clock size={13} /> Recomendados cerca
              </h4>
              <div className="space-y-2">
                {TOURISM_OPTIONS.map((t) => (
                  <div key={t.title} className="flex items-center justify-between rounded-xl bg-charcoal-50/60 px-3.5 py-2.5">
                    <p className="text-sm text-charcoal-800">{t.title}</p>
                    <span className="shrink-0 text-xs font-medium text-gold-700">{t.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

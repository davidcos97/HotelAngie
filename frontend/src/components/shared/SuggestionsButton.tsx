"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, X, Send, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";

export default function SuggestionsButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [validationError, setValidationError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (message.trim().length < 10) {
      setValidationError("Cuéntanos un poco más (mínimo 10 caracteres).");
      return;
    }
    setValidationError("");
    setSubmitting(true);
    setError(false);
    try {
      await api.post("/contact", {
        name: name.trim() || "Huésped anónimo",
        email: "sugerencias@614coliving.com",
        phone: "0000000000",
        subject: "sugerencia",
        message
      });
      setSent(true);
      setName("");
      setMessage("");
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function close() {
    setOpen(false);
    setSent(false);
    setError(false);
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 15 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar sugerencias" : "Dejar una sugerencia"}
        className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-charcoal-950 shadow-gold transition-transform hover:scale-110 sm:bottom-8 sm:left-8"
      >
        {open ? <X size={24} /> : <Lightbulb size={24} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-6 z-40 w-[22rem] max-w-[90vw] overflow-hidden rounded-2xl border border-charcoal-900/10 bg-white shadow-2xl sm:bottom-28 sm:left-8"
            role="dialog"
            aria-label="Dejar una sugerencia"
          >
            <div className="flex items-center gap-2 bg-charcoal-950 px-4 py-3.5 text-white">
              <Lightbulb size={18} className="text-gold-400" />
              <div>
                <p className="text-sm font-semibold">Sugerencias</p>
                <p className="text-[11px] text-white/60">Tu opinión nos ayuda a mejorar</p>
              </div>
            </div>

            <div className="p-4">
              {sent ? (
                <div className="flex flex-col items-center py-4 text-center">
                  <CheckCircle2 className="mb-2 text-gold-600" size={32} />
                  <p className="text-sm font-medium text-charcoal-950">¡Gracias por tu sugerencia!</p>
                  <button onClick={close} className="btn-outline mt-4 !py-2 text-xs">
                    Cerrar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre (opcional)"
                    className="w-full rounded-xl border border-charcoal-900/10 px-3.5 py-2.5 text-sm outline-none focus:border-gold-500"
                  />
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Cuéntanos tu sugerencia o idea..."
                    rows={4}
                    className="w-full rounded-xl border border-charcoal-900/10 px-3.5 py-2.5 text-sm outline-none focus:border-gold-500"
                  />
                  {validationError && <p className="text-xs text-red-600">{validationError}</p>}
                  {error && <p className="text-xs text-red-600">No pudimos enviar tu sugerencia. Intenta de nuevo.</p>}
                  <button type="submit" disabled={submitting} className="btn-gold w-full !py-2.5 text-xs">
                    <Send size={14} /> Enviar sugerencia
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

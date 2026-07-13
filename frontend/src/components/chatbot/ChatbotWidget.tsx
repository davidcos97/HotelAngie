"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { getChatAnswer } from "./chatbotEngine";
import { HOTEL } from "@/lib/data";
import { whatsappLink } from "@/lib/utils";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  fallback?: boolean;
}

const SUGGESTIONS = ["Disponibilidad", "Precios", "Check-in y check-out", "¿Aceptan mascotas?"];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: `¡Hola! Soy el asistente virtual de ${HOTEL.name}. Pregúntame sobre disponibilidad, precios, servicios o políticas del hotel.`
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text };
    const answer = getChatAnswer(text);
    const botMsg: Message = { id: crypto.randomUUID(), role: "bot", text: answer.text, fallback: !answer.matched };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar asistente virtual" : "Abrir asistente virtual"}
        className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-charcoal-950 text-gold-400 shadow-gold transition-transform hover:scale-110 sm:bottom-28 sm:right-8"
      >
        {open ? <X size={24} /> : <Bot size={26} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-40 right-6 z-40 flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-2xl border border-charcoal-900/10 bg-white shadow-2xl sm:bottom-44 sm:right-8"
            role="dialog"
            aria-label="Asistente virtual 6/14 Co-Living"
          >
            <div className="flex items-center gap-2 bg-charcoal-950 px-4 py-3.5 text-white">
              <Sparkles size={18} className="text-gold-400" />
              <div>
                <p className="text-sm font-semibold">Asistente 6/14</p>
                <p className="text-[11px] text-white/60">Respuesta al instante</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-charcoal-50/50 px-4 py-4">
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-tr-sm bg-charcoal-950 px-3.5 py-2.5 text-sm text-white"
                        : "max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-charcoal-800 shadow-sm"
                    }
                  >
                    {m.text}
                    {m.fallback && (
                      <a
                        href={whatsappLink(HOTEL.whatsapp, "Hola. Quiero información sobre una habitación.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-xs font-medium text-white"
                      >
                        Continuar por WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 border-t border-charcoal-900/5 px-3 py-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-gold-500/30 bg-gold-50 px-2.5 py-1 text-[11px] font-medium text-gold-700 hover:bg-gold-100"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-charcoal-900/5 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                aria-label="Escribe tu pregunta al asistente"
                className="flex-1 rounded-full border border-charcoal-900/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold-500"
              />
              <button
                type="submit"
                aria-label="Enviar"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-charcoal-950"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

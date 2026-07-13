"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Item {
  question: string;
  answer: string;
  category?: string;
}

export default function Accordion({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-charcoal-900/5 rounded-2xl border border-charcoal-900/5 bg-white shadow-soft">
      {items.map((item, i) => (
        <div key={item.question}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
            aria-expanded={openIndex === i}
          >
            <span className="font-medium text-charcoal-950">{item.question}</span>
            <ChevronDown className={`shrink-0 text-gold-600 transition-transform ${openIndex === i ? "rotate-180" : ""}`} size={18} />
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-sm leading-relaxed text-charcoal-700/80">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { HOTEL } from "@/lib/data";
import { whatsappLink } from "@/lib/utils";

export default function WhatsAppButton() {
  const href = whatsappLink(HOTEL.whatsapp, "Hola. Quiero información sobre una habitación.");

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.5)] transition-transform hover:scale-110 sm:bottom-8 sm:right-8"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
      <MessageCircle size={28} className="relative" fill="white" />
    </motion.a>
  );
}

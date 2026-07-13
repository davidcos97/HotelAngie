"use client";

import { useState } from "react";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    try {
      await api.post("/reviews", { name, rating, comment });
      setSent(true);
      setName("");
      setComment("");
      setRating(5);
    } catch {
      setError(true);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-gold-500/30 bg-gold-50 p-8 text-center">
        <CheckCircle2 className="mb-2 text-gold-600" size={32} />
        <p className="text-sm font-medium text-charcoal-950">¡Gracias por compartir tu experiencia!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-elevated space-y-4 p-6">
      <h3 className="font-display text-lg font-semibold text-charcoal-950">Deja tu opinión</h3>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} estrellas`}>
            <Star size={22} className={n <= rating ? "fill-gold-500 text-gold-500" : "text-charcoal-900/15"} />
          </button>
        ))}
      </div>
      <input required placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
      <textarea required placeholder="Cuéntanos sobre tu estadía..." rows={3} value={comment} onChange={(e) => setComment(e.target.value)} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
      {error && <p className="text-xs text-red-600">No pudimos publicar tu opinión. Intenta de nuevo.</p>}
      <button type="submit" className="btn-primary !px-5 !py-2.5 text-xs">
        <Send size={14} /> Publicar opinión
      </button>
    </form>
  );
}

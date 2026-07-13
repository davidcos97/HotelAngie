"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { api } from "@/lib/api";

interface Comment {
  id: string;
  name: string;
  message: string;
  date: string;
}

export default function CommentsSection({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setError(false);
    const optimistic: Comment = { id: crypto.randomUUID(), name, message, date: new Date().toISOString() };
    try {
      await api.post(`/blog/${postSlug}/comments`, { name, message });
      setComments((prev) => [optimistic, ...prev]);
      setName("");
      setMessage("");
    } catch {
      setError(true);
    }
  }

  return (
    <div className="mt-16 border-t border-charcoal-900/5 pt-10">
      <h2 className="font-display text-2xl font-semibold text-charcoal-950">Comentarios</h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu comentario..."
          rows={3}
          className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500"
        />
        {error && <p className="text-xs text-red-600">No pudimos publicar tu comentario. Intenta de nuevo más tarde.</p>}
        <button type="submit" className="btn-primary !px-5 !py-2.5 text-xs">
          <Send size={14} /> Comentar
        </button>
      </form>

      <div className="mt-8 space-y-5">
        {comments.length === 0 ? (
          <p className="text-sm text-charcoal-700/60">Sé el primero en comentar este artículo.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="rounded-xl bg-charcoal-50/60 p-4">
              <p className="text-sm font-semibold text-charcoal-950">{c.name}</p>
              <p className="mt-1 text-sm text-charcoal-700/80">{c.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

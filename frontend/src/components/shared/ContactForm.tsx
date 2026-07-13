"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo"),
  email: z.string().email("Correo inválido"),
  phone: z.string().min(7, "Ingresa un teléfono válido"),
  subject: z.string().min(1, "Selecciona un motivo"),
  message: z.string().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)")
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  async function onSubmit(data: FormData) {
    setError(false);
    try {
      await api.post("/contact", data);
      setSent(true);
      reset();
    } catch {
      setError(true);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-gold-500/30 bg-gold-50 p-10 text-center">
        <CheckCircle2 className="mb-3 text-gold-600" size={40} />
        <h3 className="font-display text-xl font-semibold text-charcoal-950">¡Mensaje enviado!</h3>
        <p className="mt-2 text-sm text-charcoal-700/75">Nuestro equipo te responderá en menos de 24 horas.</p>
        <button onClick={() => setSent(false)} className="btn-outline mt-5 !py-2.5 text-xs">
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Nombre completo</label>
        <input {...register("name")} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500" />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Correo electrónico</label>
        <input {...register("email")} type="email" className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500" />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Teléfono</label>
        <input {...register("phone")} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500" />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Motivo</label>
        <select {...register("subject")} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500">
          <option value="">Selecciona una opción</option>
          <option value="reserva">Reserva</option>
          <option value="cotizacion">Cotización</option>
          <option value="evento">Evento</option>
          <option value="trabajo">Trabaje con nosotros</option>
          <option value="otro">Otro</option>
        </select>
        {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Mensaje</label>
        <textarea {...register("message")} rows={4} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500" />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>
      {error && (
        <div className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directo por WhatsApp.
        </div>
      )}
      <div className="sm:col-span-2">
        <button type="submit" disabled={isSubmitting} className="btn-gold w-full sm:w-auto">
          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
          Enviar mensaje
        </button>
      </div>
    </form>
  );
}

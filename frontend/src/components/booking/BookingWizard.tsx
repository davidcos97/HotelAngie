"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { differenceInCalendarDays } from "date-fns";
import { CheckCircle2, Loader2, ChevronRight, ChevronLeft } from "lucide-react";
import { ROOMS } from "@/lib/data";
import type { Room } from "@/types";
import { EXTRAS } from "@/lib/extras";
import { api } from "@/lib/api";
import { whatsappLink } from "@/lib/utils";
import { HOTEL } from "@/lib/data";
import PriceSummary, { computeTotals } from "./PriceSummary";

const guestSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo"),
  email: z.string().email("Correo inválido"),
  phone: z.string().min(7, "Ingresa un teléfono válido"),
  docId: z.string().min(4, "Ingresa un documento válido"),
  notes: z.string().optional()
});

type GuestForm = z.infer<typeof guestSchema>;

interface Props {
  initialRoomSlug?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: number;
  initialChildren?: number;
}

const STEPS = ["Fechas y habitación", "Servicios adicionales", "Datos del huésped", "Confirmación"];

export default function BookingWizard({ initialRoomSlug, initialCheckIn, initialCheckOut, initialAdults, initialChildren }: Props) {
  const [step, setStep] = useState(0);
  const [rooms, setRooms] = useState<Room[]>(ROOMS);
  const [roomSlug, setRoomSlug] = useState(initialRoomSlug ?? ROOMS[0]!.slug);
  const [checkIn, setCheckIn] = useState(initialCheckIn ?? "");
  const [checkOut, setCheckOut] = useState(initialCheckOut ?? "");
  const [adults, setAdults] = useState(initialAdults ?? 2);
  const [children, setChildren] = useState(initialChildren ?? 0);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [confirmation, setConfirmation] = useState<{ code: string } | null>(null);
  const [step1Error, setStep1Error] = useState("");

  useEffect(() => {
    api
      .get<Room[]>("/rooms")
      .then((apiRooms) => {
        if (apiRooms.length > 0) setRooms(apiRooms);
      })
      .catch(() => {
        // Sin conexión con el backend: se mantienen los datos de ejemplo locales.
      });
  }, []);

  const room = rooms.find((r) => r.slug === roomSlug);
  const nights = checkIn && checkOut ? differenceInCalendarDays(new Date(checkOut), new Date(checkIn)) : 0;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<GuestForm>({ resolver: zodResolver(guestSchema) });

  function toggleExtra(id: string) {
    setSelectedExtras((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  }

  function goNextFromStep1() {
    if (!roomSlug) return setStep1Error("Selecciona una habitación.");
    if (!checkIn || !checkOut) return setStep1Error("Selecciona fecha de check-in y check-out.");
    if (nights < 1) return setStep1Error("La fecha de check-out debe ser posterior al check-in.");
    if (room && adults + children > room.capacityAdults + room.capacityChildren) {
      return setStep1Error("Esta habitación no tiene capacidad para esa cantidad de huéspedes.");
    }
    setStep1Error("");
    setStep(1);
  }

  async function onSubmitGuest(guest: GuestForm) {
    setSubmitting(true);
    setError(false);
    const { total } = computeTotals(room, nights, adults, selectedExtras);
    try {
      const res = await api.post<{ code: string }>("/bookings", {
        roomId: room?.id,
        checkIn,
        checkOut,
        adults,
        children,
        extras: selectedExtras,
        total,
        guest
      });
      setConfirmation({ code: res.code });
      setStep(3);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  return (
    <div className="grid gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-8">
          <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-charcoal-900/5">
            <div className="h-full bg-gold-gradient transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-[11px] font-medium uppercase tracking-wide text-charcoal-700/50">
            {STEPS.map((s, i) => (
              <span key={s} className={i <= step ? "text-gold-600" : ""}>{s}</span>
            ))}
          </div>
        </div>

        {step === 0 && (
          <div className="card-elevated space-y-5 p-6">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Habitación</label>
              <select value={roomSlug} onChange={(e) => setRoomSlug(e.target.value)} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500">
                {rooms.map((r) => (
                  <option key={r.slug} value={r.slug}>{r.name} — desde {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(r.pricePerNight)}/noche</option>
                ))}
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Check-in</label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Check-out</label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Adultos</label>
                <select value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500">
                  {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Niños</label>
                <select value={children} onChange={(e) => setChildren(Number(e.target.value))} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500">
                  {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
            {step1Error && <p className="text-xs text-red-600">{step1Error}</p>}
            <button onClick={goNextFromStep1} className="btn-gold w-full sm:w-auto">
              Continuar <ChevronRight size={16} />
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="card-elevated space-y-4 p-6">
            {EXTRAS.map((extra) => (
              <label key={extra.id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-charcoal-900/5 p-4 hover:border-gold-400">
                <input
                  type="checkbox"
                  checked={selectedExtras.includes(extra.id)}
                  onChange={() => toggleExtra(extra.id)}
                  className="mt-1 accent-gold-600"
                />
                <span className="flex-1">
                  <span className="block text-sm font-medium text-charcoal-950">{extra.label}</span>
                  <span className="block text-xs text-charcoal-700/60">{extra.description}</span>
                </span>
                <span className="text-sm font-semibold text-gold-700">
                  +{new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(extra.price)}
                </span>
              </label>
            ))}
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-outline"><ChevronLeft size={16} /> Atrás</button>
              <button onClick={() => setStep(2)} className="btn-gold">Continuar <ChevronRight size={16} /></button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmitGuest)} className="card-elevated space-y-4 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Nombre completo</label>
                <input {...register("name")} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500" />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Documento de identidad</label>
                <input {...register("docId")} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500" />
                {errors.docId && <p className="mt-1 text-xs text-red-600">{errors.docId.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Correo electrónico</label>
                <input {...register("email")} type="email" className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500" />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Teléfono</label>
                <input {...register("phone")} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500" />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Solicitudes especiales (opcional)</label>
              <textarea {...register("notes")} rows={3} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-3 text-sm outline-none focus:border-gold-500" />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                No pudimos confirmar tu reserva en línea. Puedes intentar de nuevo o completar tu reserva por WhatsApp.{" "}
                <a
                  href={whatsappLink(HOTEL.whatsapp, `Hola, quiero reservar ${room?.name} del ${checkIn} al ${checkOut}.`)}
                  className="font-semibold underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Escribir por WhatsApp
                </a>
              </div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="btn-outline"><ChevronLeft size={16} /> Atrás</button>
              <button type="submit" disabled={submitting} className="btn-gold">
                {submitting ? <Loader2 className="animate-spin" size={16} /> : null} Confirmar reserva
              </button>
            </div>
          </form>
        )}

        {step === 3 && confirmation && (
          <div className="card-elevated flex flex-col items-center p-10 text-center">
            <CheckCircle2 className="mb-4 text-gold-600" size={48} />
            <h3 className="font-display text-2xl font-semibold text-charcoal-950">¡Reserva confirmada!</h3>
            <p className="mt-2 text-sm text-charcoal-700/75">
              Código de reserva <span className="font-mono font-semibold text-charcoal-950">{confirmation.code}</span>. Te enviamos los detalles a tu correo.
            </p>
            <p className="mt-1 text-xs text-charcoal-700/60">Puedes gestionar o cancelar tu reserva desde tu correo de confirmación.</p>
          </div>
        )}
      </div>

      <div>
        <PriceSummary room={room} nights={nights} adults={adults} selectedExtras={selectedExtras} />
      </div>
    </div>
  );
}

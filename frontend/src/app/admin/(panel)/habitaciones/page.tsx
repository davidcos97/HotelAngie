"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useApiResource } from "@/hooks/useApiResource";
import { api } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";
import type { Room } from "@/types";

const emptyForm = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  pricePerNight: 0,
  capacityAdults: 2,
  capacityChildren: 0,
  beds: 1,
  sizeM2: 20,
  view: ""
};

export default function AdminRoomsPage() {
  const { data: rooms, loading, error, reload } = useApiResource<Room>("/rooms");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitError, setSubmitError] = useState(false);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  }

  function openEdit(room: Room) {
    setEditingId(room.id);
    setForm({
      name: room.name,
      slug: room.slug,
      shortDescription: room.shortDescription,
      description: room.description,
      pricePerNight: room.pricePerNight,
      capacityAdults: room.capacityAdults,
      capacityChildren: room.capacityChildren,
      beds: room.beds,
      sizeM2: room.sizeM2,
      view: room.view
    });
    setFormOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(false);
    try {
      if (editingId) {
        await api.put(`/rooms/${editingId}`, form);
      } else {
        await api.post("/rooms", form);
      }
      setFormOpen(false);
      reload();
    } catch {
      setSubmitError(true);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta habitación?")) return;
    try {
      await api.delete(`/rooms/${id}`);
      reload();
    } catch {
      alert("No se pudo eliminar la habitación.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-950">Habitaciones</h1>
          <p className="text-sm text-charcoal-700/60">Gestiona el inventario, precios y disponibilidad.</p>
        </div>
        <button onClick={openCreate} className="btn-primary !px-5 !py-2.5 text-xs">
          <Plus size={16} /> Nueva habitación
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} className="card-elevated mt-6 grid gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-charcoal-950">{editingId ? "Editar habitación" : "Nueva habitación"}</h2>
            <button type="button" onClick={() => setFormOpen(false)} aria-label="Cerrar"><X size={18} /></button>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Nombre</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Slug (URL)</label>
            <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Descripción corta</label>
            <input required value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Descripción completa</label>
            <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Precio por noche (COP)</label>
            <input required type="number" value={form.pricePerNight} onChange={(e) => setForm({ ...form, pricePerNight: Number(e.target.value) })} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Vista</label>
            <input value={form.view} onChange={(e) => setForm({ ...form, view: e.target.value })} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Adultos</label>
            <input type="number" value={form.capacityAdults} onChange={(e) => setForm({ ...form, capacityAdults: Number(e.target.value) })} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Niños</label>
            <input type="number" value={form.capacityChildren} onChange={(e) => setForm({ ...form, capacityChildren: Number(e.target.value) })} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Camas</label>
            <input type="number" value={form.beds} onChange={(e) => setForm({ ...form, beds: Number(e.target.value) })} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-charcoal-700">Tamaño (m²)</label>
            <input type="number" value={form.sizeM2} onChange={(e) => setForm({ ...form, sizeM2: Number(e.target.value) })} className="w-full rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          </div>

          {submitError && (
            <div className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              No se pudo guardar la habitación. Verifica la conexión con el backend.
            </div>
          )}

          <div className="sm:col-span-2">
            <button type="submit" className="btn-gold">{editingId ? "Guardar cambios" : "Crear habitación"}</button>
          </div>
        </form>
      )}

      <div className="mt-6">
        <DataTable<Room>
          rows={rooms}
          loading={loading}
          error={error}
          keyField={(r) => r.id}
          columns={[
            { header: "Nombre", render: (r) => <span className="font-medium">{r.name}</span> },
            { header: "Precio/noche", render: (r) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(r.pricePerNight) },
            { header: "Capacidad", render: (r) => `${r.capacityAdults + r.capacityChildren} huéspedes` },
            { header: "Rating", render: (r) => `${r.rating.toFixed(1)} (${r.reviewsCount})` },
            {
              header: "Acciones",
              render: (r) => (
                <div className="flex gap-2">
                  <button onClick={() => openEdit(r)} aria-label="Editar" className="rounded-lg p-1.5 hover:bg-gold-50 hover:text-gold-700"><Pencil size={15} /></button>
                  <button onClick={() => handleDelete(r.id)} aria-label="Eliminar" className="rounded-lg p-1.5 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button>
                </div>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

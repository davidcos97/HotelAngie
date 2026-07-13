"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { useApiResource } from "@/hooks/useApiResource";
import { api } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";
import type { Promotion } from "@/types";

const emptyForm = { title: "", description: "", discount: "", code: "", validUntil: "" };

export default function AdminPromotionsPage() {
  const { data: promos, loading, error, reload } = useApiResource<Promotion>("/promotions");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitError, setSubmitError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(false);
    try {
      await api.post("/promotions", form);
      setFormOpen(false);
      setForm(emptyForm);
      reload();
    } catch {
      setSubmitError(true);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta promoción?")) return;
    try {
      await api.delete(`/promotions/${id}`);
      reload();
    } catch {
      alert("No se pudo eliminar la promoción.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-950">Promociones</h1>
          <p className="text-sm text-charcoal-700/60">Crea y administra ofertas y cupones.</p>
        </div>
        <button onClick={() => setFormOpen(true)} className="btn-primary !px-5 !py-2.5 text-xs">
          <Plus size={16} /> Nueva promoción
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} className="card-elevated mt-6 grid gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-charcoal-950">Nueva promoción</h2>
            <button type="button" onClick={() => setFormOpen(false)} aria-label="Cerrar"><X size={18} /></button>
          </div>
          <input required placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          <input required placeholder="Código (ej. ANTICIPA20)" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          <input required placeholder="Descuento (ej. 20%)" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} className="rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          <input required type="date" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })} className="rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          <textarea required placeholder="Descripción" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="sm:col-span-2 rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          {submitError && <div className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">No se pudo guardar la promoción.</div>}
          <div className="sm:col-span-2">
            <button type="submit" className="btn-gold">Crear promoción</button>
          </div>
        </form>
      )}

      <div className="mt-6">
        <DataTable<Promotion>
          rows={promos}
          loading={loading}
          error={error}
          keyField={(p) => p.id}
          columns={[
            { header: "Título", render: (p) => <span className="font-medium">{p.title}</span> },
            { header: "Código", render: (p) => <span className="font-mono text-xs">{p.code}</span> },
            { header: "Descuento", render: (p) => p.discount },
            { header: "Válido hasta", render: (p) => p.validUntil },
            { header: "Acciones", render: (p) => <button onClick={() => handleDelete(p.id)} className="rounded-lg p-1.5 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button> }
          ]}
        />
      </div>
    </div>
  );
}

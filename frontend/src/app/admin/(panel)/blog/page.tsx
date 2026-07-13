"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useApiResource } from "@/hooks/useApiResource";
import { api } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";
import type { BlogPost } from "@/types";

const emptyForm = { title: "", slug: "", excerpt: "", content: "", category: "", author: "" };

export default function AdminBlogPage() {
  const { data: posts, loading, error, reload } = useApiResource<BlogPost>("/blog");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitError, setSubmitError] = useState(false);

  function openEdit(post: BlogPost) {
    setEditingId(post.id);
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, category: post.category, author: post.author });
    setFormOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(false);
    try {
      if (editingId) await api.put(`/blog/${editingId}`, form);
      else await api.post("/blog", form);
      setFormOpen(false);
      reload();
    } catch {
      setSubmitError(true);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este artículo?")) return;
    try {
      await api.delete(`/blog/${id}`);
      reload();
    } catch {
      alert("No se pudo eliminar el artículo.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-950">Blog</h1>
          <p className="text-sm text-charcoal-700/60">Gestiona artículos, categorías y autores.</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setForm(emptyForm);
            setFormOpen(true);
          }}
          className="btn-primary !px-5 !py-2.5 text-xs"
        >
          <Plus size={16} /> Nuevo artículo
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} className="card-elevated mt-6 grid gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-charcoal-950">{editingId ? "Editar artículo" : "Nuevo artículo"}</h2>
            <button type="button" onClick={() => setFormOpen(false)} aria-label="Cerrar"><X size={18} /></button>
          </div>
          <input required placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          <input required placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          <input required placeholder="Categoría" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          <input required placeholder="Autor" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          <textarea required placeholder="Extracto" rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="sm:col-span-2 rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          <textarea required placeholder="Contenido" rows={5} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="sm:col-span-2 rounded-xl border border-charcoal-900/10 px-4 py-2.5 text-sm outline-none focus:border-gold-500" />
          {submitError && <div className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">No se pudo guardar el artículo.</div>}
          <div className="sm:col-span-2">
            <button type="submit" className="btn-gold">{editingId ? "Guardar cambios" : "Publicar artículo"}</button>
          </div>
        </form>
      )}

      <div className="mt-6">
        <DataTable<BlogPost>
          rows={posts}
          loading={loading}
          error={error}
          keyField={(p) => p.id}
          columns={[
            { header: "Título", render: (p) => <span className="font-medium">{p.title}</span> },
            { header: "Categoría", render: (p) => p.category },
            { header: "Autor", render: (p) => p.author },
            { header: "Fecha", render: (p) => p.publishedAt },
            {
              header: "Acciones",
              render: (p) => (
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)} aria-label="Editar" className="rounded-lg p-1.5 hover:bg-gold-50 hover:text-gold-700"><Pencil size={15} /></button>
                  <button onClick={() => handleDelete(p.id)} aria-label="Eliminar" className="rounded-lg p-1.5 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button>
                </div>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}

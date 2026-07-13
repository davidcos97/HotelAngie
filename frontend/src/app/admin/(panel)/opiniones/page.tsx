"use client";

import { Trash2 } from "lucide-react";
import { useApiResource } from "@/hooks/useApiResource";
import { api } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";
import StarRating from "@/components/shared/StarRating";
import type { Review } from "@/types";

export default function AdminReviewsPage() {
  const { data: reviews, loading, error, reload } = useApiResource<Review>("/reviews");

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta opinión?")) return;
    try {
      await api.delete(`/reviews/${id}`);
      reload();
    } catch {
      alert("No se pudo eliminar la opinión.");
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal-950">Opiniones</h1>
      <p className="text-sm text-charcoal-700/60">Modera las reseñas visibles en el sitio público.</p>

      <div className="mt-6">
        <DataTable<Review>
          rows={reviews}
          loading={loading}
          error={error}
          keyField={(r) => r.id}
          columns={[
            { header: "Huésped", render: (r) => r.name },
            { header: "Calificación", render: (r) => <StarRating rating={r.rating} /> },
            { header: "Comentario", render: (r) => <span className="line-clamp-2 max-w-md">{r.comment}</span> },
            { header: "Fecha", render: (r) => r.date },
            { header: "Acciones", render: (r) => <button onClick={() => handleDelete(r.id)} className="rounded-lg p-1.5 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button> }
          ]}
        />
      </div>
    </div>
  );
}

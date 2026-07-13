import { Loader2, AlertTriangle, Inbox } from "lucide-react";

export interface Column<T> {
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
}

interface Props<T> {
  columns: Column<T>[];
  rows: T[] | null;
  loading: boolean;
  error: boolean;
  emptyLabel?: string;
  keyField: (row: T) => string;
}

export default function DataTable<T>({ columns, rows, loading, error, emptyLabel = "Sin registros", keyField }: Props<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-charcoal-900/5 bg-white py-16 text-sm text-charcoal-700/60">
        <Loader2 className="animate-spin" size={16} /> Cargando datos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-16 text-sm text-red-700">
        <AlertTriangle size={20} />
        No pudimos conectar con el servidor. Verifica que el backend esté corriendo en NEXT_PUBLIC_API_URL.
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-charcoal-900/5 bg-white py-16 text-sm text-charcoal-700/60">
        <Inbox size={20} /> {emptyLabel}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-charcoal-900/5 bg-white shadow-soft">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-charcoal-900/5 bg-charcoal-50/60">
            {columns.map((col) => (
              <th key={col.header} className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-charcoal-700/60">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={keyField(row)} className="border-b border-charcoal-900/5 last:border-0 hover:bg-gold-50/40">
              {columns.map((col) => (
                <td key={col.header} className={`px-5 py-4 text-charcoal-800 ${col.className ?? ""}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

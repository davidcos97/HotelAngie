import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex bg-charcoal-50/40">
        <AdminSidebar />
        <main className="min-h-screen flex-1 overflow-x-hidden p-8">{children}</main>
      </div>
    </AdminGuard>
  );
}

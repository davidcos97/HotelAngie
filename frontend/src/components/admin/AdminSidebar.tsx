"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BedDouble, CalendarCheck, Newspaper, Tag, Star, Users, LogOut } from "lucide-react";
import { logout, getStoredUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/habitaciones", label: "Habitaciones", icon: BedDouble },
  { href: "/admin/reservas", label: "Reservas", icon: CalendarCheck },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/promociones", label: "Promociones", icon: Tag },
  { href: "/admin/opiniones", label: "Opiniones", icon: Star },
  { href: "/admin/usuarios", label: "Usuarios", icon: Users }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = getStoredUser();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-charcoal-900/5 bg-charcoal-950 text-white">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-6 py-5">
        <Image src="/assets/logo/logo-emblem.svg" alt="" width={36} height={36} />
        <div>
          <p className="font-display text-sm font-semibold">6/14 Admin</p>
          <p className="text-[11px] text-white/40">{user?.email ?? "admin@614coliving.com"}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-gold-400",
              pathname === link.href && "bg-gold-500/10 text-gold-400"
            )}
          >
            <link.icon size={17} /> {link.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={() => {
          logout();
          router.push("/admin/login");
        }}
        className="m-3 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-red-400"
      >
        <LogOut size={17} /> Cerrar sesión
      </button>
    </aside>
  );
}

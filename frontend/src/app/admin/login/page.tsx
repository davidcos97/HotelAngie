"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Lock } from "lucide-react";
import { login } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      router.push("/admin/dashboard");
    } catch {
      setError("Credenciales incorrectas o el servidor no está disponible.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal-950 px-5">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
        <div className="mb-6 flex flex-col items-center">
          <Image src="/assets/logo/logo-emblem.svg" alt="" width={56} height={56} />
          <h1 className="mt-4 font-display text-xl font-semibold text-white">Panel administrativo</h1>
          <p className="text-xs text-white/50">6/14 Co-Living</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/70">Correo electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-gold-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/70">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-gold-500"
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="btn-gold w-full">
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Lock size={16} />}
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

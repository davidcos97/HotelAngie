import { api } from "./api";

const TOKEN_KEY = "614_token";
const USER_KEY = "614_user";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
}

export async function login(email: string, password: string) {
  const res = await api.post<{ token: string; user: AdminUser }>("/auth/login", { email, password });
  localStorage.setItem(TOKEN_KEY, res.token);
  localStorage.setItem(USER_KEY, JSON.stringify(res.user));
  return res.user;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated() {
  return !!getToken();
}

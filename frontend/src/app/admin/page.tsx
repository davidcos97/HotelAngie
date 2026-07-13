"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(isAuthenticated() ? "/admin/dashboard" : "/admin/login");
  }, [router]);

  return null;
}

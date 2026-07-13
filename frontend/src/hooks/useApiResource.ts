"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useApiResource<T>(path: string) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    setError(false);
    api
      .get<T[]>(path)
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [path]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, error, reload };
}

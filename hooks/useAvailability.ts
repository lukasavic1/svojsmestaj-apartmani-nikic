"use client";

import { useEffect, useState } from "react";
import type { AvailabilityPayload } from "@/types/calendar";

export function useAvailability(unitId: string | undefined) {
  const [result, setResult] = useState<{
    id: string;
    payload?: AvailabilityPayload;
    error?: string;
  } | null>(null);

  useEffect(() => {
    if (!unitId) return;

    const controller = new AbortController();
    fetch(`/api/availability/${unitId}`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(String(res.status));
        return (await res.json()) as AvailabilityPayload;
      })
      .then((payload) => {
        setResult({ id: unitId, payload });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setResult({ id: unitId, error: "unavailable" });
      });

    return () => controller.abort();
  }, [unitId]);

  if (!unitId) {
    return { data: null, loading: false, error: null };
  }

  const match = result?.id === unitId;
  return {
    data: match ? (result.payload ?? null) : null,
    loading: !match,
    error: match ? (result.error ?? null) : null,
  };
}

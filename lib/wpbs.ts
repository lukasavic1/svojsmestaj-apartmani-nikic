import { bookedKey, isoListToBooked, parseIsoDate } from "@/lib/calendar";
import { orangeBookedIso } from "@/data/availability-fallback";

const WPBS_URL = "https://apartmaninikic.me/wp-admin/admin-ajax.php";

export function parseWpbsBookedIso(html: string): string[] {
  const out: string[] = [];
  const re = /<div class="wpbs-date[^"]*"[^>]*>/g;
  for (const match of html.matchAll(re)) {
    const tag = match[0];
    if (!/wpbs-legend-item-26/.test(tag)) continue;
    const year = tag.match(/data-year="(\d+)"/)?.[1];
    const month = tag.match(/data-month="(\d+)"/)?.[1];
    const day = tag.match(/data-day="(\d+)"/)?.[1];
    if (!year || !month || !day) continue;
    out.push(
      `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    );
  }
  return out;
}

export async function fetchWpbsMonth(
  calendarId: number,
  year: number,
  month1: number
): Promise<string> {
  const body = new URLSearchParams({
    action: "wpbs_refresh_calendar",
    id: String(calendarId),
    year: String(year),
    month: String(month1),
    current_year: String(year),
    current_month: String(month1),
  });

  const res = await fetch(WPBS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
        "Mozilla/5.0 (compatible; SvojSmestaj/1.0; +https://apartmaninikic.me)",
    },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`WPBS ${res.status}`);
  }
  return res.text();
}

function mergeIso(
  map: Record<string, number[]>,
  dates: string[]
): Record<string, number[]> {
  for (const iso of dates) {
    const d = parseIsoDate(iso);
    if (!d) continue;
    const key = bookedKey(d.year, d.month);
    if (!map[key]) map[key] = [];
    if (!map[key].includes(d.day)) map[key].push(d.day);
  }
  return map;
}

async function pool<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<PromiseSettledResult<T>[]> {
  const results: PromiseSettledResult<T>[] = new Array(tasks.length);
  let next = 0;
  async function worker() {
    while (next < tasks.length) {
      const i = next++;
      try {
        results[i] = { status: "fulfilled", value: await tasks[i]() };
      } catch (reason) {
        results[i] = { status: "rejected", reason };
      }
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, tasks.length) }, () => worker())
  );
  return results;
}

export async function fetchWpbsBooked(
  calendarId: number,
  monthsAhead = 12
): Promise<Record<string, number[]>> {
  const now = new Date();
  const tasks = Array.from({ length: monthsAhead }, (_, i) => {
    const cursor = new Date(now.getFullYear(), now.getMonth() + i, 1);
    return () =>
      fetchWpbsMonth(calendarId, cursor.getFullYear(), cursor.getMonth() + 1);
  });

  const pages = await pool(tasks, 3);
  const booked: Record<string, number[]> = {};
  let ok = 0;

  for (const page of pages) {
    if (page.status !== "fulfilled") continue;
    if (/critical error/i.test(page.value)) continue;
    mergeIso(booked, parseWpbsBookedIso(page.value));
    ok += 1;
  }

  if (ok === 0) {
    if (calendarId === 7) return isoListToBooked(orangeBookedIso);
    return {};
  }

  return booked;
}

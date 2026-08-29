import { getApartment } from "@/data/apartments";
import { bookedKey } from "@/lib/calendar";
import { availabilityWindow } from "@/lib/availability";
import type { AvailabilityPayload } from "@/types/calendar";

function seed(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) h = (h * 33 + id.charCodeAt(i)) >>> 0;
  return h;
}

/** Deterministic mock occupancy per unit — not live WordPress data. */
export function getMockAvailability(unitId: string): AvailabilityPayload {
  const unit = getApartment(unitId);
  const { first, last } = availabilityWindow(8);

  if (!unit || unit.fullyBooked || unit.calendarId == null) {
    return { unitId, fullyBooked: true, booked: {}, first, last };
  }

  const s = seed(unit.id);
  const booked: Record<string, number[]> = {};

  for (let m = 0; m < 8; m += 1) {
    const cursor = new Date(first.year, first.month + m, 1);
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const dim = new Date(year, month + 1, 0).getDate();
    const days: number[] = [];
    const startA = 3 + ((s + m * 7) % 9);
    const lenA = 2 + ((s + m) % 4);
    const startB = 17 + ((s + m * 5) % 6);
    const lenB = 2 + ((s + m * 3) % 3);
    for (let d = startA; d < startA + lenA && d <= dim; d += 1) days.push(d);
    for (let d = startB; d < startB + lenB && d <= dim; d += 1) days.push(d);
    booked[bookedKey(year, month)] = days;
  }

  return { unitId: unit.id, fullyBooked: false, booked, first, last };
}

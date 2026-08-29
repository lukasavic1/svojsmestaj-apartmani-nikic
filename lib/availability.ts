import { unstable_cache } from "next/cache";
import { getApartment } from "@/data/apartments";
import { fetchWpbsBooked } from "@/lib/wpbs";
import type { AvailabilityPayload, YearMonth } from "@/types/calendar";

export function availabilityWindow(months = 12): {
  first: YearMonth;
  last: YearMonth;
} {
  const now = new Date();
  const first = { year: now.getFullYear(), month: now.getMonth() };
  const lastDate = new Date(now.getFullYear(), now.getMonth() + months - 1, 1);
  return {
    first,
    last: { year: lastDate.getFullYear(), month: lastDate.getMonth() },
  };
}

async function loadAvailability(unitId: string): Promise<AvailabilityPayload> {
  const unit = getApartment(unitId);
  if (!unit) {
    throw new Error("Unknown unit");
  }

  const { first, last } = availabilityWindow(12);

  if (unit.fullyBooked || unit.calendarId == null) {
    return {
      unitId: unit.id,
      fullyBooked: true,
      booked: {},
      first,
      last,
    };
  }

  const booked = await fetchWpbsBooked(unit.calendarId, 12);
  return {
    unitId: unit.id,
    fullyBooked: false,
    booked,
    first,
    last,
  };
}

export function getCachedAvailability(unitId: string) {
  return unstable_cache(
    () => loadAvailability(unitId),
    ["wpbs-availability", unitId],
    { revalidate: 3600 }
  )();
}

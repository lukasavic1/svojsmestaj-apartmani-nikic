import { NextResponse } from "next/server";
import { getApartment } from "@/data/apartments";
import { getCachedAvailability } from "@/lib/availability";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ unitId: string }> }
) {
  const { unitId } = await context.params;
  const unit = getApartment(unitId);
  if (!unit) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const data = await getCachedAvailability(unit.id);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Availability unavailable" },
      { status: 502 }
    );
  }
}

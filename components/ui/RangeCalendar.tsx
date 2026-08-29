"use client";

import { useMemo, useState } from "react";
import type { AvailabilityPayload, YearMonth } from "@/types/calendar";
import {
  asMonthIndex,
  compareIso,
  daysInMonth,
  isDayBooked,
  isInRange,
  isRangeEndpoint,
  mondayOffset,
  nightsBetween,
  rangeHasBookedNight,
  shiftMonth,
  toIsoDate,
  todayIso,
} from "@/lib/calendar";
import { site } from "@/data/site";
import { useSite } from "@/components/providers/SiteProvider";

type Props = {
  availability: AvailabilityPayload;
  checkIn: string | null;
  checkOut: string | null;
  onChange: (checkIn: string | null, checkOut: string | null) => void;
  selectable?: boolean;
};

export function RangeCalendar({
  availability,
  checkIn,
  checkOut,
  onChange,
  selectable = true,
}: Props) {
  const { ui } = useSite();
  const [cursor, setCursor] = useState<YearMonth>(availability.first);
  const [error, setError] = useState<string | null>(null);
  const today = todayIso();

  const { year, month } = cursor;
  const totalDays = daysInMonth(year, month);
  const offset = mondayOffset(year, month);
  const atFirst =
    asMonthIndex(year, month) <=
    asMonthIndex(availability.first.year, availability.first.month);
  const atLast =
    asMonthIndex(year, month) >=
    asMonthIndex(availability.last.year, availability.last.month);

  const hint = useMemo(() => {
    if (!selectable) return null;
    if (!checkIn) return ui.calendar.selectCheckIn;
    if (!checkOut) return ui.calendar.selectCheckOut;
    return null;
  }, [checkIn, checkOut, selectable, ui.calendar.selectCheckIn, ui.calendar.selectCheckOut]);

  const pick = (iso: string, booked: boolean) => {
    if (!selectable || booked || compareIso(iso, today) < 0) return;

    if (!checkIn || (checkIn && checkOut)) {
      onChange(iso, null);
      setError(null);
      return;
    }

    if (compareIso(iso, checkIn) <= 0) {
      onChange(iso, null);
      setError(null);
      return;
    }

    if (rangeHasBookedNight(availability.booked, checkIn, iso)) {
      setError(ui.calendar.rangeBlocked);
      return;
    }

    if (nightsBetween(checkIn, iso) < site.minNights) {
      setError(ui.booking.errors.minStay);
      return;
    }

    onChange(checkIn, iso);
    setError(null);
  };

  return (
    <div className="rounded-3xl border border-navy/8 bg-cream/80 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 id="range-cal-month" className="font-heading text-xl text-ink">
          {ui.calendar.months[month]} {year}.
        </h3>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setCursor(shiftMonth(cursor, -1))}
            disabled={atFirst}
            aria-label={ui.calendar.prevMonth}
            className="grid size-9 place-items-center rounded-full border border-navy/10 text-ink disabled:opacity-30"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setCursor(shiftMonth(cursor, 1))}
            disabled={atLast}
            aria-label={ui.calendar.nextMonth}
            className="grid size-9 place-items-center rounded-full border border-navy/10 text-ink disabled:opacity-30"
          >
            ›
          </button>
        </div>
      </div>

      {hint ? <p className="mt-2 text-xs text-muted">{hint}</p> : null}
      {error ? (
        <p className="mt-2 text-xs text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div
        className="mt-4 grid grid-cols-7 gap-1"
        role="grid"
        aria-labelledby="range-cal-month"
      >
        {ui.calendar.days.map((d, i) => (
          <div
            className="pb-1 text-center text-[0.65rem] font-semibold tracking-wide text-muted uppercase"
            role="columnheader"
            key={`${d}-${i}`}
          >
            {d}
          </div>
        ))}

        {Array.from({ length: offset }, (_, i) => (
          <div key={`e-${i}`} />
        ))}

        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const iso = toIsoDate(year, month, day);
          const booked = isDayBooked(availability.booked, year, month, day);
          const past = compareIso(iso, today) < 0;
          const disabled = booked || past || !selectable;
          const inRange = isInRange(iso, checkIn, checkOut);
          const endpoint = isRangeEndpoint(iso, checkIn, checkOut);

          return (
            <button
              key={iso}
              type="button"
              role="gridcell"
              disabled={disabled}
              aria-label={`${day}. ${ui.calendar.months[month]} — ${
                booked ? ui.calendar.busy : ui.calendar.free
              }`}
              onClick={() => pick(iso, booked)}
              className={`grid aspect-square place-items-center rounded-xl text-sm font-medium transition ${
                booked
                  ? "bg-[#eaadad]/80 text-ink/70 line-through"
                  : past
                    ? "text-ink/30"
                    : endpoint
                      ? "bg-navy text-white"
                      : inRange
                        ? "bg-navy/15 text-navy"
                        : "bg-[#81d742]/25 text-ink hover:bg-[#81d742]/45"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <i className="size-2.5 rounded-full bg-[#81d742]" aria-hidden="true" />
          {ui.calendar.free}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="size-2.5 rounded-full bg-[#eaadad]" aria-hidden="true" />
          {ui.calendar.busy}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="size-2.5 rounded-full bg-navy" aria-hidden="true" />
          {ui.calendar.selected}
        </span>
      </div>

      {selectable && (checkIn || checkOut) ? (
        <button
          type="button"
          className="mt-3 text-xs font-semibold tracking-wide text-navy uppercase underline-offset-2 hover:underline"
          onClick={() => {
            onChange(null, null);
            setError(null);
          }}
        >
          {ui.calendar.clearDates}
        </button>
      ) : null}
    </div>
  );
}

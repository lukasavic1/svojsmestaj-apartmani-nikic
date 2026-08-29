"use client";

import { useEffect, useMemo, useState } from "react";
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

function MonthGrid({
  year,
  month,
  availability,
  checkIn,
  checkOut,
  selectable,
  today,
  labelledBy,
  onPick,
}: {
  year: number;
  month: number;
  availability: AvailabilityPayload;
  checkIn: string | null;
  checkOut: string | null;
  selectable: boolean;
  today: string;
  labelledBy: string;
  onPick: (iso: string, booked: boolean) => void;
}) {
  const { ui } = useSite();
  const totalDays = daysInMonth(year, month);
  const offset = mondayOffset(year, month);

  return (
    <div>
      <h3 id={labelledBy} className="mb-3 font-heading text-xl text-ink">
        {ui.calendar.months[month]} {year}.
      </h3>
      <div className="grid grid-cols-7 gap-1.5" role="grid" aria-labelledby={labelledBy}>
        {ui.calendar.days.map((d, i) => (
          <div
            className="pb-1 text-center text-[0.68rem] font-semibold tracking-wide text-muted uppercase"
            role="columnheader"
            key={`${labelledBy}-${d}-${i}`}
          >
            {d}
          </div>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <div key={`${labelledBy}-e-${i}`} />
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
              onClick={() => onPick(iso, booked)}
              className={`grid min-h-11 w-full place-items-center rounded-xl text-sm font-semibold transition sm:min-h-12 ${
                booked
                  ? "cursor-not-allowed bg-slate-100 text-slate-400 line-through"
                  : past
                    ? "cursor-not-allowed text-slate-300"
                    : endpoint
                      ? "bg-slate-900 text-white shadow-sm"
                      : inRange
                        ? "bg-slate-900/10 text-slate-900"
                        : "border border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

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

  useEffect(() => {
    setCursor(availability.first);
    setError(null);
  }, [availability.unitId, availability.first.year, availability.first.month]);

  const nextMonth = shiftMonth(cursor, 1);
  const atFirst =
    asMonthIndex(cursor.year, cursor.month) <=
    asMonthIndex(availability.first.year, availability.first.month);
  const atLast =
    asMonthIndex(cursor.year, cursor.month) >=
    asMonthIndex(availability.last.year, availability.last.month);
  const showSecond =
    asMonthIndex(nextMonth.year, nextMonth.month) <=
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
    <div className="w-full rounded-3xl border border-slate-200/70 bg-white/80 p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setCursor(shiftMonth(cursor, -1))}
          disabled={atFirst}
          aria-label={ui.calendar.prevMonth}
          className="grid size-10 place-items-center rounded-full border border-navy/10 text-lg text-ink disabled:opacity-30"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setCursor(shiftMonth(cursor, 1))}
          disabled={atLast}
          aria-label={ui.calendar.nextMonth}
          className="grid size-10 place-items-center rounded-full border border-navy/10 text-lg text-ink disabled:opacity-30"
        >
          ›
        </button>
      </div>

      {hint ? (
        <p className="mb-4 rounded-xl border border-[#C5A880]/60 bg-[#C5A880]/12 px-3 py-2 text-sm font-medium text-ink">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          className="mb-4 rounded-xl border border-red-400 bg-red-50 px-3 py-2 text-sm font-medium text-red-800"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2">
        <MonthGrid
          year={cursor.year}
          month={cursor.month}
          availability={availability}
          checkIn={checkIn}
          checkOut={checkOut}
          selectable={selectable}
          today={today}
          labelledBy="range-cal-month-a"
          onPick={pick}
        />
        {showSecond ? (
          <div className="hidden lg:block">
            <MonthGrid
              year={nextMonth.year}
              month={nextMonth.month}
              availability={availability}
              checkIn={checkIn}
              checkOut={checkOut}
              selectable={selectable}
              today={today}
              labelledBy="range-cal-month-b"
              onPick={pick}
            />
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-5 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <i className="size-3 rounded-md border border-emerald-200 bg-emerald-50" aria-hidden="true" />
          {ui.calendar.free}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="size-3 rounded-md bg-slate-100" aria-hidden="true" />
          {ui.calendar.busy}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="size-3 rounded-md bg-slate-900" aria-hidden="true" />
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

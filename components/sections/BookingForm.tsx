"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Maximize2, MessageSquare, Phone, User, Users } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apartments, getApartment } from "@/data/apartments";
import { getMockAvailability } from "@/data/mock-availability";
import { createBookingSchema, type BookingValues } from "@/lib/booking-schema";
import { formatLongDate, nightsBetween, rangeHasBookedNight } from "@/lib/calendar";
import { formatInquiryMessage } from "@/lib/whatsapp";
import { tx } from "@/lib/i18n";
import { useSite } from "@/components/providers/SiteProvider";
import { RangeCalendar } from "@/components/ui/RangeCalendar";
import { BookingSuccessModal, type BookingReceipt } from "./BookingSuccessModal";

const fieldClass =
  "h-12 w-full rounded-2xl border border-slate-200 bg-white py-3 pr-4 pl-11 text-sm text-ink outline-none transition focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/25";

const btnPrimary =
  "inline-flex h-12 flex-1 items-center justify-center rounded-full bg-navy text-[0.72rem] font-semibold tracking-[0.12em] text-white uppercase shadow-lg shadow-navy/10 transition hover:bg-[#b38f58] hover:shadow-amber-500/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-35";

const btnGhost =
  "inline-flex h-12 flex-1 items-center justify-center rounded-full border border-navy/12 text-[0.72rem] font-semibold tracking-[0.12em] uppercase transition hover:bg-slate-50";

function Notice({ children }: { children: string }) {
  return (
    <p
      role="alert"
      className="mt-2 rounded-xl border border-red-400 bg-red-50 px-3 py-2 text-[0.75rem] font-medium text-red-800"
    >
      {children}
    </p>
  );
}

type Props = {
  onSuccess?: () => void;
  lockedApartmentId?: string;
  stickyTopClass?: string;
};

type Step = 1 | 2 | 3;

function scrollableAncestor(el: HTMLElement | null): HTMLElement | null {
  let node = el?.parentElement ?? null;
  while (node) {
    const { overflowY } = getComputedStyle(node);
    if (
      (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") &&
      node.scrollHeight > node.clientHeight + 4
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

export function BookingForm({
  onSuccess,
  lockedApartmentId,
  stickyTopClass = "top-[4.35rem] sm:top-[4.6rem]",
}: Props) {
  const { locale, ui, bookingPrefill } = useSite();
  const schema = useMemo(() => createBookingSchema(ui), [ui]);
  const prefilled = lockedApartmentId ?? bookingPrefill.apartmentId ?? "";
  const [step, setStep] = useState<Step>(prefilled ? 2 : 1);
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const skipStepScroll = useRef(true);

  useEffect(() => {
    if (skipStepScroll.current) {
      skipStepScroll.current = false;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const root = formRef.current;
      if (!root) return;
      const parent = scrollableAncestor(root);
      if (parent) {
        parent.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [step]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      checkIn: bookingPrefill.checkIn ?? "",
      checkOut: bookingPrefill.checkOut ?? "",
      apartmentId: prefilled,
      guests: bookingPrefill.guests ?? 2,
      message: "",
    },
  });

  useEffect(() => {
    if (lockedApartmentId) return;
    const nextId = bookingPrefill.apartmentId ?? "";
    reset({
      name: "",
      email: "",
      phone: "",
      checkIn: bookingPrefill.checkIn ?? "",
      checkOut: bookingPrefill.checkOut ?? "",
      apartmentId: nextId,
      guests: bookingPrefill.guests ?? 2,
      message: "",
    });
    setStep(nextId ? 2 : 1);
    setReceipt(null);
  }, [bookingPrefill, lockedApartmentId, reset]);

  const apartmentId = useWatch({ control, name: "apartmentId" });
  const checkIn = useWatch({ control, name: "checkIn" });
  const checkOut = useWatch({ control, name: "checkOut" });
  const name = useWatch({ control, name: "name" });
  const email = useWatch({ control, name: "email" });
  const phone = useWatch({ control, name: "phone" });
  const guests = useWatch({ control, name: "guests" });
  const unit = getApartment(apartmentId);
  const availability = getMockAvailability(apartmentId || apartments[0].id);

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const estimate =
    unit && unit.pricePerNight != null && nights > 0 ? unit.pricePerNight * nights : null;
  const periodLabel =
    checkIn && checkOut
      ? `${formatLongDate(checkIn, ui.calendar.months)} — ${formatLongDate(checkOut, ui.calendar.months)}`
      : "";

  useEffect(() => {
    if (lockedApartmentId && apartmentId !== lockedApartmentId) {
      setValue("apartmentId", lockedApartmentId);
    }
  }, [apartmentId, lockedApartmentId, setValue]);

  const pickUnit = (id: string) => {
    setValue("apartmentId", id, { shouldValidate: true });
    setValue("checkIn", "");
    setValue("checkOut", "");
  };

  const canAdvanceDates = Boolean(apartmentId);
  const canAdvanceDetails = Boolean(unit?.fullyBooked || (checkIn && checkOut));
  const canSubmit =
    (name?.trim().length ?? 0) >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim() ?? "") &&
    (phone?.trim().length ?? 0) >= 6 &&
    Number.isFinite(guests) &&
    guests >= 1 &&
    (!unit || guests <= unit.capacity);

  const onSubmit = (values: BookingValues) => {
    const selected = getApartment(values.apartmentId);
    if (
      selected &&
      !selected.fullyBooked &&
      values.checkIn &&
      values.checkOut &&
      rangeHasBookedNight(availability.booked, values.checkIn, values.checkOut)
    ) {
      setError("checkOut", { message: ui.booking.errors.booked });
      setStep(2);
      return;
    }

    const apartmentName = selected ? tx(selected.name, locale) : values.apartmentId;
    setReceipt({
      apartmentName,
      period:
        values.checkIn && values.checkOut
          ? `${formatLongDate(values.checkIn, ui.calendar.months)} — ${formatLongDate(values.checkOut, ui.calendar.months)}`
          : "—",
      guests: values.guests,
      whatsappText: formatInquiryMessage(
        {
          ...values,
          apartmentName,
        },
        locale
      ),
    });
  };

  const dismissSuccess = () => {
    setReceipt(null);
    reset({
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      apartmentId: lockedApartmentId ?? "",
      guests: 2,
      message: "",
    });
    setStep(lockedApartmentId ? 2 : 1);
    onSuccess?.();
  };

  const steps: { n: Step; label: string }[] = [
    { n: 1, label: ui.booking.stepApartment },
    { n: 2, label: ui.booking.stepDates },
    { n: 3, label: ui.booking.stepDetails },
  ];

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <ol
          className={`sticky z-20 grid w-full grid-cols-3 gap-2 border-b border-slate-200/60 bg-white/90 px-5 py-3 backdrop-blur-md md:px-10 ${stickyTopClass}`}
        >
          {steps.map((item) => {
            const active = step === item.n;
            const done = step > item.n;
            return (
              <li key={item.n}>
                <button
                  type="button"
                  disabled={item.n > step}
                  onClick={() => item.n < step && setStep(item.n)}
                  className={`flex w-full items-center justify-center gap-2 rounded-full px-3 py-2.5 text-[0.68rem] font-semibold tracking-[0.14em] uppercase transition ${
                    active
                      ? "bg-[#C5A880] text-navy shadow-sm"
                      : done
                        ? "bg-[#C5A880]/15 text-navy"
                        : "bg-warm text-muted"
                  } disabled:cursor-default`}
                >
                  <span
                    className={`grid size-6 place-items-center rounded-full text-[0.65rem] ${
                      active || done ? "bg-navy text-white" : "bg-white text-muted"
                    }`}
                  >
                    {item.n}
                  </span>
                  <span className="hidden truncate sm:inline">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="grid gap-6 px-5 py-6 md:px-10 md:py-8">
          {step === 1 && !lockedApartmentId ? (
            <div>
              <p className="mb-5 text-base text-muted">{ui.booking.selectApartment}</p>
              <div className="grid gap-4">
                {apartments.map((item) => {
                  const active = apartmentId === item.id;
                  const cover = item.photos[0];
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      whileHover={{ scale: 1.012 }}
                      whileTap={{ scale: 0.995 }}
                      onClick={() => pickUnit(item.id)}
                      className={`flex w-full flex-col gap-4 rounded-3xl p-3 text-left transition sm:flex-row sm:items-center sm:p-4 ${
                        active
                          ? "border-2 border-[#C5A880] bg-amber-50/30 shadow-md shadow-[#C5A880]/15"
                          : "border border-slate-200/80 bg-white hover:border-[#C5A880]/50 hover:shadow-lg hover:shadow-slate-200/50"
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:h-32 sm:w-48 sm:shrink-0 sm:aspect-auto">
                        {cover ? (
                          <Image
                            src={cover.src}
                            alt={tx(item.name, locale)}
                            fill
                            sizes="(max-width: 640px) 100vw, 192px"
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1 px-1 pb-1 sm:px-0 sm:pb-0">
                        <p className="font-heading text-xl text-ink sm:text-2xl">
                          {tx(item.name, locale)}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm text-muted">{tx(item.hook, locale)}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-warm px-2.5 py-1 text-xs font-medium text-navy">
                            <Maximize2 className="size-3.5" />
                            {item.sizeSqm} m²
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-warm px-2.5 py-1 text-xs font-medium text-navy">
                            <Users className="size-3.5" />
                            {item.capacity} {ui.apartments.capacity}
                          </span>
                          <span className="inline-flex rounded-full bg-[#C5A880] px-3 py-1 text-xs font-semibold tracking-wide text-navy">
                            {item.fullyBooked || item.pricePerNight == null
                              ? ui.apartments.occupied
                              : `${item.pricePerNight} € ${ui.apartments.perNight}`}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              <input type="hidden" {...register("apartmentId")} />
              {errors.apartmentId ? <Notice>{errors.apartmentId.message ?? ""}</Notice> : null}
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => canAdvanceDates && setStep(2)}
                  disabled={!canAdvanceDates}
                  className={`${btnPrimary} max-w-xs`}
                >
                  {ui.booking.next}
                </button>
              </div>
            </div>
          ) : null}

          {lockedApartmentId ? <input type="hidden" {...register("apartmentId")} /> : null}

          {step === 2 ? (
            <div>
              {unit ? (
                <p className="mb-4 font-heading text-2xl text-ink">{tx(unit.name, locale)}</p>
              ) : null}
              {unit?.fullyBooked ? (
                <div className="rounded-2xl border border-red-400 bg-red-50 px-4 py-3">
                  <p className="text-[0.68rem] font-semibold tracking-[0.12em] text-red-800 uppercase">
                    {ui.calendar.occupiedBanner}
                  </p>
                  <p className="mt-1 text-sm text-ink/80">{ui.calendar.occupiedBody}</p>
                </div>
              ) : (
                <RangeCalendar
                  key={apartmentId}
                  availability={availability}
                  checkIn={checkIn || null}
                  checkOut={checkOut || null}
                  onChange={(start, end) => {
                    setValue("checkIn", start ?? "", { shouldValidate: true });
                    setValue("checkOut", end ?? "", { shouldValidate: true });
                  }}
                />
              )}
              {checkIn && checkOut ? (
                <div className="mt-5 flex flex-col justify-between gap-2 rounded-2xl border border-[#C5A880]/40 bg-[#C5A880]/10 px-4 py-3 sm:flex-row sm:items-center">
                  <p className="text-sm text-ink">
                    <span className="font-semibold">{ui.booking.selectedRange}:</span> {periodLabel}{" "}
                    ({nights} {nights === 1 ? ui.booking.night : ui.booking.nights})
                  </p>
                  {estimate != null ? (
                    <p className="text-sm font-semibold text-navy">
                      {ui.booking.estimatedTotal}: {estimate} €
                    </p>
                  ) : null}
                </div>
              ) : null}
              {errors.checkIn ? <Notice>{errors.checkIn.message ?? ""}</Notice> : null}
              {errors.checkOut ? <Notice>{errors.checkOut.message ?? ""}</Notice> : null}
              <div className="mt-6 flex gap-3">
                {!lockedApartmentId ? (
                  <button type="button" onClick={() => setStep(1)} className={btnGhost}>
                    {ui.booking.back}
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => canAdvanceDetails && setStep(3)}
                  disabled={!canAdvanceDetails}
                  className={btnPrimary}
                >
                  {ui.booking.next}
                </button>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <aside className="rounded-3xl border border-slate-200/70 bg-warm/80 p-5">
                {unit?.photos[0] ? (
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={unit.photos[0].src}
                      alt={tx(unit.name, locale)}
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <p className="font-heading text-2xl text-ink">
                  {unit ? tx(unit.name, locale) : ui.booking.apartment}
                </p>
                {periodLabel ? <p className="mt-2 text-sm text-muted">{periodLabel}</p> : null}
                <p className="mt-1 text-sm text-muted">
                  {guests} {ui.apartments.capacity}
                </p>
                {estimate != null ? (
                  <div className="mt-4 border-t border-navy/8 pt-4">
                    <p className="text-xs tracking-[0.12em] text-muted uppercase">
                      {ui.booking.estimatedTotal}
                    </p>
                    <p className="mt-1 font-heading text-3xl text-navy">{estimate} €</p>
                    <p className="mt-1 text-xs text-muted">
                      {nights} × {unit?.pricePerNight} €
                    </p>
                  </div>
                ) : null}
              </aside>

              <div className="grid gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                    {ui.booking.name}
                  </span>
                  <span className="relative block">
                    <User className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#C5A880]" />
                    <input className={fieldClass} autoComplete="name" {...register("name")} />
                  </span>
                  {errors.name ? <Notice>{errors.name.message ?? ""}</Notice> : null}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                    {ui.booking.phone}
                  </span>
                  <span className="relative block">
                    <Phone className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#C5A880]" />
                    <input className={fieldClass} type="tel" autoComplete="tel" {...register("phone")} />
                  </span>
                  {errors.phone ? <Notice>{errors.phone.message ?? ""}</Notice> : null}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                    {ui.booking.email}
                  </span>
                  <span className="relative block">
                    <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#C5A880]" />
                    <input className={fieldClass} type="email" autoComplete="email" {...register("email")} />
                  </span>
                  {errors.email ? <Notice>{errors.email.message ?? ""}</Notice> : null}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                    {ui.booking.guests}
                  </span>
                  <span className="relative block">
                    <Users className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#C5A880]" />
                    <input
                      className={fieldClass}
                      type="number"
                      min={1}
                      max={unit?.capacity ?? 5}
                      {...register("guests", { valueAsNumber: true })}
                    />
                  </span>
                  {errors.guests ? <Notice>{errors.guests.message ?? ""}</Notice> : null}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[0.68rem] font-semibold tracking-[0.14em] text-muted uppercase">
                    {ui.booking.message}
                  </span>
                  <span className="relative block">
                    <MessageSquare className="pointer-events-none absolute top-3.5 left-3.5 size-4 text-[#C5A880]" />
                    <textarea
                      rows={3}
                      placeholder={ui.booking.messageHint}
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3 pr-4 pl-11 text-sm text-ink outline-none transition focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/25"
                      {...register("message")}
                    />
                  </span>
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setStep(unit?.fullyBooked && !lockedApartmentId ? 1 : 2)}
                    className={btnGhost}
                  >
                    {ui.booking.back}
                  </button>
                  <button type="submit" disabled={!canSubmit} className={btnPrimary}>
                    {ui.booking.submit}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </form>

      <BookingSuccessModal open={Boolean(receipt)} receipt={receipt} onClose={dismissSuccess} />
    </>
  );
}

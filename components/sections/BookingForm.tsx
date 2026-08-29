"use client";

import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apartments, getApartment } from "@/data/apartments";
import { site } from "@/data/site";
import { createBookingSchema, type BookingValues } from "@/lib/booking-schema";
import { formatInquiryMessage, whatsappHref } from "@/lib/whatsapp";
import { rangeHasBookedNight } from "@/lib/calendar";
import { tx } from "@/lib/i18n";
import { useAvailability } from "@/hooks/useAvailability";
import { useSite } from "@/components/providers/SiteProvider";
import { RangeCalendar } from "@/components/ui/RangeCalendar";

const fieldClass =
  "mt-1.5 h-12 w-full rounded-2xl border border-navy/10 bg-white px-4 text-sm text-ink outline-none transition focus:border-gold";

type Props = {
  onSuccess?: () => void;
  lockedApartmentId?: string;
};

export function BookingForm({ onSuccess, lockedApartmentId }: Props) {
  const { locale, ui, bookingPrefill } = useSite();
  const schema = useMemo(() => createBookingSchema(ui), [ui]);
  const defaultApartment =
    lockedApartmentId ?? bookingPrefill.apartmentId ?? apartments[0].id;

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useForm<BookingValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      checkIn: bookingPrefill.checkIn ?? "",
      checkOut: bookingPrefill.checkOut ?? "",
      apartmentId: defaultApartment,
      guests: bookingPrefill.guests ?? 2,
      message: "",
    },
  });

  useEffect(() => {
    if (lockedApartmentId) return;
    reset({
      name: "",
      email: "",
      phone: "",
      checkIn: bookingPrefill.checkIn ?? "",
      checkOut: bookingPrefill.checkOut ?? "",
      apartmentId: bookingPrefill.apartmentId ?? apartments[0].id,
      guests: bookingPrefill.guests ?? 2,
      message: "",
    });
  }, [bookingPrefill, lockedApartmentId, reset]);

  const apartmentId = useWatch({ control, name: "apartmentId" });
  const checkIn = useWatch({ control, name: "checkIn" });
  const checkOut = useWatch({ control, name: "checkOut" });
  const unit = getApartment(apartmentId);
  const { data: availability, loading, error } = useAvailability(apartmentId);
  useEffect(() => {
    if (lockedApartmentId && apartmentId !== lockedApartmentId) {
      setValue("apartmentId", lockedApartmentId);
    }
  }, [apartmentId, lockedApartmentId, setValue]);

  const onSubmit = (values: BookingValues) => {
    const selected = getApartment(values.apartmentId);
    if (
      selected &&
      !selected.fullyBooked &&
      availability &&
      values.checkIn &&
      values.checkOut &&
      rangeHasBookedNight(availability.booked, values.checkIn, values.checkOut)
    ) {
      setError("checkOut", { message: ui.booking.errors.booked });
      return;
    }

    const href = whatsappHref(
      formatInquiryMessage(
        {
          ...values,
          apartmentName: selected ? tx(selected.name, locale) : values.apartmentId,
        },
        locale
      )
    );
    window.open(href, "_blank", "noopener,noreferrer");
    onSuccess?.();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="rounded-3xl bg-cream px-6 py-10 text-center">
        <p className="font-heading text-3xl text-ink">{ui.booking.successTitle}</p>
        <p className="mx-auto mt-3 max-w-md text-muted">{ui.booking.successBody}</p>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex h-12 items-center rounded-full bg-navy px-6 text-[0.75rem] font-semibold tracking-[0.12em] text-white uppercase"
        >
          {ui.booking.whatsapp}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
      {unit?.fullyBooked ? (
        <div className="rounded-2xl border border-[#eaadad] bg-[#eaadad]/20 px-4 py-3 sm:col-span-2">
          <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-red-800 uppercase">
            {ui.calendar.occupiedBanner}
          </p>
          <p className="mt-1 text-sm text-ink/80">{ui.calendar.occupiedBody}</p>
        </div>
      ) : loading ? (
        <p className="text-sm text-muted sm:col-span-2">{ui.calendar.loading}</p>
      ) : error ? (
        <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2">
          <p className="text-sm text-muted sm:col-span-2">{ui.calendar.unavailable}</p>
          <label className="block text-sm font-medium text-ink">
            {ui.booking.checkIn}
            <input className={fieldClass} type="date" {...register("checkIn")} />
          </label>
          <label className="block text-sm font-medium text-ink">
            {ui.booking.checkOut}
            <input className={fieldClass} type="date" {...register("checkOut")} />
          </label>
        </div>
      ) : availability ? (
        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-medium text-ink">
            {ui.apartments.availability}
            {unit ? ` · ${tx(unit.name, locale)}` : ""}
          </p>
          <RangeCalendar
            availability={availability}
            checkIn={checkIn || null}
            checkOut={checkOut || null}
            onChange={(start, end) => {
              setValue("checkIn", start ?? "", { shouldValidate: true });
              setValue("checkOut", end ?? "", { shouldValidate: true });
            }}
          />
          {errors.checkIn ? (
            <span className="mt-1 block text-xs text-red-700">{errors.checkIn.message}</span>
          ) : null}
          {errors.checkOut ? (
            <span className="mt-1 block text-xs text-red-700">{errors.checkOut.message}</span>
          ) : null}
        </div>
      ) : null}

      <label className="block text-sm font-medium text-ink">
        {ui.booking.name}
        <input className={fieldClass} autoComplete="name" {...register("name")} />
        {errors.name ? <span className="mt-1 block text-xs text-red-700">{errors.name.message}</span> : null}
      </label>
      <label className="block text-sm font-medium text-ink">
        {ui.booking.email}
        <input className={fieldClass} type="email" autoComplete="email" {...register("email")} />
        {errors.email ? <span className="mt-1 block text-xs text-red-700">{errors.email.message}</span> : null}
      </label>
      <label className="block text-sm font-medium text-ink sm:col-span-2">
        {ui.booking.phone}
        <input className={fieldClass} type="tel" autoComplete="tel" {...register("phone")} />
        {errors.phone ? <span className="mt-1 block text-xs text-red-700">{errors.phone.message}</span> : null}
      </label>
      {lockedApartmentId ? (
        <div className="block text-sm font-medium text-ink">
          {ui.booking.apartment}
          <p className="mt-1.5 flex h-12 items-center rounded-2xl border border-navy/10 bg-warm px-4 text-sm">
            {unit ? tx(unit.name, locale) : lockedApartmentId}
          </p>
          <input type="hidden" {...register("apartmentId")} />
        </div>
      ) : (
        <label className="block text-sm font-medium text-ink">
          {ui.booking.apartment}
          <select
            className={fieldClass}
            {...register("apartmentId", {
              onChange: () => {
                setValue("checkIn", "");
                setValue("checkOut", "");
              },
            })}
          >
            <option value="">{ui.booking.selectApartment}</option>
            {apartments.map((item) => (
              <option key={item.id} value={item.id}>
                {tx(item.name, locale)} · {item.capacity} {ui.apartments.capacity}
                {item.fullyBooked ? ` · ${ui.apartments.occupied}` : ""}
              </option>
            ))}
          </select>
          {errors.apartmentId ? (
            <span className="mt-1 block text-xs text-red-700">{errors.apartmentId.message}</span>
          ) : null}
        </label>
      )}
      <label className="block text-sm font-medium text-ink">
        {ui.booking.guests}
        <input className={fieldClass} type="number" min={1} max={5} {...register("guests", { valueAsNumber: true })} />
        {errors.guests ? (
          <span className="mt-1 block text-xs text-red-700">{errors.guests.message}</span>
        ) : null}
      </label>
      <label className="block text-sm font-medium text-ink sm:col-span-2">
        {ui.booking.message}
        <textarea
          rows={4}
          placeholder={ui.booking.messageHint}
          className="mt-1.5 w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
          {...register("message")}
        />
      </label>
      <p className="text-xs leading-relaxed text-muted sm:col-span-2">{ui.booking.note}</p>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <button
          type="submit"
          className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-navy text-[0.75rem] font-semibold tracking-[0.14em] text-white uppercase hover:bg-gold-deep"
        >
          {ui.booking.submit}
        </button>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-navy/15 text-[0.75rem] font-semibold tracking-[0.14em] uppercase hover:border-gold"
        >
          {ui.booking.whatsapp} · {site.contact.phoneDisplay}
        </a>
      </div>
    </form>
  );
}

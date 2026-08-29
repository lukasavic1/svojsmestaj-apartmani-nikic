import { z } from "zod";
import type { UiDictionary } from "@/content/ui";
import { apartments } from "@/data/apartments";
import { site } from "@/data/site";
import { nightsBetween } from "@/lib/calendar";

export function createBookingSchema(ui: UiDictionary) {
  return z
    .object({
      name: z.string().trim().min(2, ui.booking.errors.name),
      email: z.string().trim().email(ui.booking.errors.email),
      phone: z.string().trim().min(6, ui.booking.errors.phone),
      checkIn: z.string(),
      checkOut: z.string(),
      apartmentId: z.string().min(1, ui.booking.errors.apartment),
      guests: z.number().int().min(1, ui.booking.errors.guests),
      message: z.string().optional(),
    })
    .superRefine((value, ctx) => {
      const unit = apartments.find((item) => item.id === value.apartmentId);
      const datesRequired = !unit?.fullyBooked;

      if (datesRequired && !value.checkIn) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["checkIn"],
          message: ui.booking.errors.checkIn,
        });
      }
      if (datesRequired && !value.checkOut) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["checkOut"],
          message: ui.booking.errors.checkOut,
        });
      }

      if (value.checkIn && value.checkOut && value.checkOut <= value.checkIn) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["checkOut"],
          message: ui.booking.errors.range,
        });
      } else if (
        value.checkIn &&
        value.checkOut &&
        nightsBetween(value.checkIn, value.checkOut) < site.minNights
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["checkOut"],
          message: ui.booking.errors.minStay,
        });
      }

      if (unit && value.guests > unit.capacity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["guests"],
          message: ui.booking.errors.capacity,
        });
      }
    });
}

export type BookingValues = z.infer<ReturnType<typeof createBookingSchema>>;

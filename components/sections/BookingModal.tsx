"use client";

import { Modal } from "@/components/ui/Modal";
import { useSite } from "@/components/providers/SiteProvider";
import { BookingForm } from "./BookingForm";

export function BookingModal() {
  const { ui, bookingOpen, closeBooking } = useSite();

  return (
    <Modal
      open={bookingOpen}
      title={ui.booking.heading}
      onClose={closeBooking}
      closeLabel={ui.booking.close}
      wide
    >
      <div className="-mx-5 -my-5 sm:-mx-7 sm:-my-6">
        <p className="border-b border-navy/8 px-4 py-3 text-sm text-muted sm:px-5">
          {ui.booking.lead}
        </p>
        <BookingForm stickyTopClass="top-0" onSuccess={closeBooking} />
      </div>
    </Modal>
  );
}

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
      <BookingForm stickyTopClass="top-0" onSuccess={closeBooking} />
    </Modal>
  );
}

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
    >
      <p className="mb-5 text-sm text-muted">{ui.booking.lead}</p>
      <BookingForm onSuccess={closeBooking} />
    </Modal>
  );
}

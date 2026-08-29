"use client";

import { useCallback, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useSite } from "@/components/providers/SiteProvider";
import { BookingForm } from "./BookingForm";
import { BookingSuccessModal, type BookingReceipt } from "./BookingSuccessModal";

export function BookingModal() {
  const { ui, bookingOpen, closeBooking } = useSite();
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);

  const handleSubmitted = useCallback(
    (next: BookingReceipt) => {
      setReceipt(next);
      closeBooking();
    },
    [closeBooking]
  );

  return (
    <>
      <Modal
        open={bookingOpen}
        title={ui.booking.heading}
        onClose={closeBooking}
        closeLabel={ui.booking.close}
        wide
      >
        <BookingForm
          stickyTopClass="top-0"
          onSubmitted={handleSubmitted}
          onCancel={closeBooking}
        />
      </Modal>
      <BookingSuccessModal
        open={Boolean(receipt)}
        receipt={receipt}
        onClose={() => setReceipt(null)}
      />
    </>
  );
}

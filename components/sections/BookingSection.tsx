"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSite } from "@/components/providers/SiteProvider";
import { BookingForm } from "./BookingForm";

export function BookingSection() {
  const { ui } = useSite();

  return (
    <section id="kontakt" className="bg-cream px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          kicker={ui.booking.kicker}
          heading={ui.booking.heading}
          lead={ui.booking.lead}
        />
        <div className="mt-6 rounded-2xl bg-white p-5 shadow-lg shadow-slate-200/40 sm:p-6">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}

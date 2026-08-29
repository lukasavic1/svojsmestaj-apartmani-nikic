"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSite } from "@/components/providers/SiteProvider";
import { BookingForm } from "./BookingForm";

export function BookingSection() {
  const { ui } = useSite();

  return (
    <section id="kontakt" className="bg-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          kicker={ui.booking.kicker}
          heading={ui.booking.heading}
          lead={ui.booking.lead}
        />
        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <BookingForm />
          <p className="mt-5 text-xs text-muted">{ui.booking.policies}</p>
        </div>
      </div>
    </section>
  );
}

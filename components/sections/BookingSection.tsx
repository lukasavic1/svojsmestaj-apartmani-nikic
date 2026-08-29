"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSite } from "@/components/providers/SiteProvider";
import { BookingForm } from "./BookingForm";

export function BookingSection() {
  const { ui } = useSite();

  return (
    <section id="kontakt" className="bg-cream px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          kicker={ui.booking.kicker}
          heading={ui.booking.heading}
          lead={ui.booking.lead}
        />
        <div className="mt-8 overflow-visible rounded-3xl border border-slate-200/60 bg-white/90 shadow-2xl shadow-slate-200/40 backdrop-blur-md">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}

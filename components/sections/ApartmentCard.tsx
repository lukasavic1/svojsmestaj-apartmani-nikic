"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import type { Apartment } from "@/types/apartment";
import { tx, txList } from "@/lib/i18n";
import { apartmentHref } from "@/lib/paths";
import { fadeInUp } from "@/lib/motion";
import { PhotoCarousel } from "@/components/ui/PhotoCarousel";
import { useSite } from "@/components/providers/SiteProvider";

type Props = {
  apartment: Apartment;
};

export function ApartmentCard({ apartment }: Props) {
  const { locale, ui, openBooking } = useSite();
  const priceLabel =
    apartment.fullyBooked || apartment.pricePerNight == null
      ? ui.apartments.occupied
      : `${apartment.pricePerNight} €`;

  return (
    <motion.article
      variants={fadeInUp}
      layout
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50"
    >
      <div className="relative aspect-[4/3]">
        <PhotoCarousel
          photos={apartment.photos}
          locale={locale}
          className="absolute inset-0 h-full w-full"
          sizes="(max-width: 768px) 100vw, 33vw"
          prevLabel={ui.apartments.prev}
          nextLabel={ui.apartments.next}
        />
        <span
          className="absolute top-4 left-4 rounded-full px-3 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-md"
          style={{ background: `${apartment.accent}CC` }}
        >
          {apartment.number} · {tx(apartment.name, locale)}
        </span>
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink backdrop-blur-md">
          <Users className="size-3.5" />
          {apartment.capacity} {ui.apartments.capacity}
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-navy/70 px-2.5 py-1 text-[0.68rem] font-medium text-white backdrop-blur-md">
          {apartment.photos.length} {ui.apartments.photoCount}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-muted">{tx(apartment.hook, locale)}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {txList(apartment.tags, locale).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-warm px-2.5 py-1 text-[0.7rem] font-medium tracking-wide text-navy-soft"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-5 font-heading text-2xl text-ink">
          {apartment.fullyBooked ? (
            priceLabel
          ) : (
            <>
              {priceLabel}
              <span className="ml-1 text-sm font-sans font-normal text-muted">
                {ui.apartments.perNight}
              </span>
            </>
          )}
        </p>
        <div className="mt-auto flex gap-2 pt-5">
          <Link
            href={apartmentHref(apartment.slug, locale)}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-navy/12 text-[0.72rem] font-semibold tracking-[0.12em] uppercase transition hover:border-gold hover:text-gold-deep"
          >
            {ui.apartments.details}
          </Link>
          <button
            type="button"
            onClick={() => openBooking({ apartmentId: apartment.id })}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-navy text-[0.72rem] font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-gold-deep"
          >
            {ui.apartments.book}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

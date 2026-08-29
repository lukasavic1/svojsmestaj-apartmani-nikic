"use client";

import { Images, Users } from "lucide-react";
import type { Apartment } from "@/types/apartment";
import { tx, txList } from "@/lib/i18n";
import { PhotoCarousel } from "@/components/ui/PhotoCarousel";
import { useSite } from "@/components/providers/SiteProvider";

type Props = {
  apartment: Apartment;
  onOpenGallery: () => void;
};

export function ApartmentCard({ apartment, onOpenGallery }: Props) {
  const { locale, ui, openBooking } = useSite();
  const priceLabel =
    apartment.fullyBooked || apartment.pricePerNight == null
      ? ui.apartments.occupied
      : `${apartment.pricePerNight} €`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-200/40">
      <div
        className="relative aspect-[4/3] cursor-zoom-in"
        onClick={onOpenGallery}
        role="button"
        tabIndex={0}
        aria-label={ui.apartments.openGallery}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenGallery();
          }
        }}
      >
        <PhotoCarousel
          photos={apartment.photos}
          locale={locale}
          className="absolute inset-0 h-full w-full"
          sizes="(max-width: 768px) 100vw, 33vw"
          prevLabel={ui.apartments.prev}
          nextLabel={ui.apartments.next}
          onImageClick={onOpenGallery}
        />
        <div className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center bg-navy/0 opacity-0 transition duration-300 group-hover:bg-navy/40 group-hover:opacity-100">
          <span className="grid size-12 place-items-center rounded-full bg-white/95 text-navy shadow-lg">
            <Images className="size-5" />
          </span>
          <span className="mt-2 rounded-full bg-white/95 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-navy uppercase">
            {ui.apartments.openGallery}
          </span>
        </div>
        <span
          className="pointer-events-none absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-[0.68rem] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-md"
          style={{ background: `${apartment.accent}CC` }}
        >
          {apartment.number} · {tx(apartment.name, locale)}
        </span>
        <span className="pointer-events-none absolute top-4 right-4 z-10 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink backdrop-blur-md">
          <Users className="size-3.5" />
          {apartment.capacity} {ui.apartments.capacity}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="line-clamp-3 min-h-[4.2rem] text-sm leading-relaxed text-muted">
          {tx(apartment.hook, locale)}
        </p>
        <div className="mt-3 flex min-h-[3.4rem] flex-wrap content-start gap-1.5">
          {txList(apartment.tags, locale).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-warm px-2.5 py-1 text-[0.7rem] font-medium tracking-wide text-navy-soft"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-4">
          <p className="flex h-8 items-baseline font-heading text-2xl text-ink">
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
          <button
            type="button"
            onClick={() => openBooking({ apartmentId: apartment.id })}
            className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full bg-navy text-[0.72rem] font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-gold-deep"
          >
            {ui.apartments.book}
          </button>
        </div>
      </div>
    </article>
  );
}

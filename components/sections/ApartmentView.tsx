"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import type { Apartment } from "@/types/apartment";
import { tx } from "@/lib/i18n";
import { withLang } from "@/lib/paths";
import { amenityLabel, AmenityIcon } from "@/components/ui/AmenityIcon";
import { PhotoCarousel } from "@/components/ui/PhotoCarousel";
import { useSite } from "@/components/providers/SiteProvider";
import { BookingForm } from "@/components/sections/BookingForm";

export function ApartmentView({ apartment }: { apartment: Apartment }) {
  const { locale, ui } = useSite();
  const [active, setActive] = useState(0);
  const price =
    apartment.fullyBooked || apartment.pricePerNight == null
      ? ui.apartments.occupied
      : `${apartment.pricePerNight} €`;

  return (
    <article className="bg-cream pt-[4.6rem]">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Link
          href={withLang("/#apartmani", locale)}
          className="text-[0.72rem] font-semibold tracking-[0.14em] text-gold-deep uppercase"
        >
          ← {ui.apartments.back}
        </Link>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-gold-deep uppercase">
              {apartment.number} · {apartment.sizeSqm} m²
            </p>
            <h1 className="mt-2 font-heading text-4xl text-ink sm:text-5xl">
              {tx(apartment.name, locale)}
            </h1>
            <p className="mt-3 max-w-2xl text-muted">{tx(apartment.hook, locale)}</p>
          </div>
          <p className="font-heading text-3xl text-ink">
            {price}
            {apartment.pricePerNight != null && !apartment.fullyBooked ? (
              <span className="ml-1 text-sm font-sans font-normal text-muted">
                {ui.apartments.perNight}
              </span>
            ) : null}
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-[1.5rem]">
              <PhotoCarousel
                photos={apartment.photos}
                locale={locale}
                className="aspect-[4/3] h-auto min-h-[280px]"
                sizes="(max-width: 1024px) 100vw, 60vw"
                prevLabel={ui.apartments.prev}
                nextLabel={ui.apartments.next}
                priority
                index={active}
                onIndexChange={setActive}
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
              {apartment.photos.map((photo, i) => (
                <button
                  key={`${photo.src}-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative aspect-square overflow-hidden rounded-xl ring-2 ${
                    i === active ? "ring-gold" : "ring-transparent"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={tx(photo.alt, locale)}
                    fill
                    sizes="120px"
                    unoptimized
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white px-3 py-3 shadow-sm">
                <dt className="text-muted">{ui.apartments.size}</dt>
                <dd className="mt-1 font-heading text-xl text-ink">{apartment.sizeSqm} m²</dd>
              </div>
              <div className="rounded-2xl bg-white px-3 py-3 shadow-sm">
                <dt className="text-muted">{ui.apartments.capacity}</dt>
                <dd className="mt-1 flex items-center gap-1 font-heading text-xl text-ink">
                  <Users className="size-4" />
                  {apartment.capacity}
                </dd>
              </div>
              <div className="rounded-2xl bg-white px-3 py-3 shadow-sm">
                <dt className="text-muted">
                  {apartment.bedrooms === 0
                    ? ui.apartments.studioLayout
                    : ui.apartments.bedrooms}
                </dt>
                <dd className="mt-1 font-heading text-xl text-ink">
                  {apartment.bedrooms === 0 ? "—" : apartment.bedrooms}
                </dd>
              </div>
              <div className="rounded-2xl bg-white px-3 py-3 shadow-sm">
                <dt className="text-muted">{ui.apartments.beds}</dt>
                <dd className="mt-1 font-heading text-xl text-ink">{apartment.beds}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-ink/80">{tx(apartment.layout, locale)}</p>
            <div className="mt-8 rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-6">
              <h2 className="font-heading text-2xl text-ink">
                {ui.apartments.enquireThis}
              </h2>
              <p className="mt-2 text-sm text-muted">{ui.booking.lead}</p>
              <div className="mt-5">
                <BookingForm lockedApartmentId={apartment.id} />
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-12 max-w-3xl space-y-4 text-[1.05rem] leading-relaxed text-ink/85">
          <p>{tx(apartment.description, locale)}</p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {apartment.amenityKeys.map((key) => (
            <li
              key={key}
              className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm text-ink/80 shadow-sm"
            >
              <AmenityIcon name={key} className="size-4 text-gold-deep" />
              {amenityLabel(key, locale)}
            </li>
          ))}
        </ul>

        <section className="mt-14">
          <h2 className="font-heading text-3xl text-ink">{ui.apartments.gallery}</h2>
          <p className="mt-2 text-sm text-muted">
            {apartment.photos.length} {ui.apartments.photoCount}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {apartment.photos.map((photo, i) => (
              <div
                key={`grid-${photo.src}-${i}`}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy/5"
              >
                <Image
                  src={photo.src}
                  alt={tx(photo.alt, locale)}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

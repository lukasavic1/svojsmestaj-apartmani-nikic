"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import { site } from "@/data/site";
import type { Review } from "@/types/apartment";
import { tx } from "@/lib/i18n";
import { fadeInUp, stagger } from "@/lib/motion";
import { useSwipeIndex } from "@/hooks/useSwipeIndex";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSite } from "@/components/providers/SiteProvider";

const PAGE_SIZE = 3;

function flagEmoji(code?: string) {
  if (!code) return "";
  if (code === "XK") return "🇽🇰";
  return [...code.toUpperCase()]
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

function ReviewCard({ review }: { review: Review }) {
  const { locale, ui } = useSite();
  const initial = review.name.slice(0, 1).toUpperCase();

  return (
    <motion.article
      variants={fadeInUp}
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/60 bg-[#FDFBF7] p-6 shadow-xl shadow-slate-200/50"
    >
      <Quote className="pointer-events-none absolute top-5 right-5 size-10 text-[#C5A880]/25" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#C5A880] to-navy font-heading text-lg text-white shadow-sm">
            {initial}
          </span>
          <div>
            <p className="flex items-center gap-1.5 font-semibold text-ink">
              {review.name}
              {review.country ? (
                <span className="text-base leading-none" aria-hidden="true">
                  {flagEmoji(review.country)}
                </span>
              ) : null}
            </p>
            <p className="text-xs text-muted">{tx(review.date, locale)}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
          {review.rating.toFixed(1)} / 10
        </span>
      </div>
      <p className="mt-5 max-w-[36ch] flex-1 text-[0.95rem] leading-relaxed text-ink/85 line-clamp-7">
        “{tx(review.quote, locale)}”
      </p>
      <p className="mt-5 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.08em] text-[#C5A880] uppercase">
        <BadgeCheck className="size-3.5" />
        {review.source === "Airbnb" ? "Airbnb" : ui.reviews.verified}
      </p>
    </motion.article>
  );
}

export function ReviewsSection() {
  const { ui } = useSite();
  const [page, setPage] = useState(0);
  const desktopRef = useRef<HTMLDivElement>(null);
  const pages = Math.ceil(reviews.length / PAGE_SIZE);
  const visible = useMemo(
    () => reviews.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [page]
  );

  const step = useCallback(
    (dir: 1 | -1) => setPage((i) => (i + dir + pages) % pages),
    [pages]
  );

  useSwipeIndex(desktopRef, { count: pages, onSwipe: step });

  return (
    <section id="utisci" className="bg-warm px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading kicker={ui.reviews.kicker} heading={ui.reviews.heading} lead={ui.reviews.lead} />
          <div className="shrink-0 rounded-3xl border border-slate-200/60 bg-white px-6 py-5 shadow-xl shadow-slate-200/40">
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-[#C5A880] uppercase">
              Booking.com · Airbnb
            </p>
            <p className="mt-1 font-heading text-4xl text-ink">
              {site.rating.bookingScore}
              <span className="ml-1 text-lg text-muted">/ 10</span>
            </p>
            <div className="mt-2 flex gap-1 text-[#C5A880]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-muted">
              {ui.reviews.basedOn.replace("{n}", String(site.rating.count))}
            </p>
          </div>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory lg:hidden">
          {reviews.map((review) => (
            <div key={review.id} className="w-[min(85vw,22rem)] shrink-0 snap-start">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        <motion.div
          ref={desktopRef}
          key={page}
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-10 hidden gap-6 lg:grid lg:grid-cols-3"
        >
          {visible.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </motion.div>

        <div className="mt-6 hidden items-center justify-between lg:flex">
          <div className="flex gap-1.5">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${ui.reviews.next} ${i + 1}`}
                onClick={() => setPage(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === page ? "w-7 bg-navy" : "w-2 bg-navy/20"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={ui.reviews.prev}
              onClick={() => step(-1)}
              className="grid size-11 place-items-center rounded-full bg-white text-ink shadow-sm"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label={ui.reviews.next}
              onClick={() => step(1)}
              className="grid size-11 place-items-center rounded-full bg-navy text-white shadow-sm"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

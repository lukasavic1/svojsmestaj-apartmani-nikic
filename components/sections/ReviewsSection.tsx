"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import { site } from "@/data/site";
import { tx } from "@/lib/i18n";
import { easeOutExpo } from "@/lib/motion";
import { useSwipeIndex } from "@/hooks/useSwipeIndex";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSite } from "@/components/providers/SiteProvider";

export function ReviewsSection() {
  const { locale, ui } = useSite();
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const count = reviews.length;

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  useSwipeIndex(ref, { count, onSwipe: step });
  const review = reviews[index];

  return (
    <section id="utisci" className="bg-warm px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            kicker={ui.reviews.kicker}
            heading={ui.reviews.heading}
            lead={ui.reviews.lead}
          />
          <div className="shrink-0 rounded-3xl bg-white px-6 py-5 shadow-xl shadow-slate-200/50">
            <p className="font-heading text-4xl text-ink">
              {site.rating.bookingScore}
              <span className="text-xl text-muted"> / 10</span>
            </p>
            <p className="mt-1 text-[0.72rem] font-semibold tracking-[0.16em] text-gold-deep uppercase">
              {ui.reviews.badge}
            </p>
            <p className="mt-2 text-sm text-muted">
              {ui.reviews.basedOn.replace("{n}", String(site.rating.count))}
            </p>
            <div className="mt-2 flex gap-0.5 text-gold-deep">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
          </div>
        </div>

        <div ref={ref} className="relative mt-12">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: easeOutExpo }}
              className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-12"
            >
              <Quote className="size-10 text-gold" />
              <p className="mt-5 max-w-3xl font-heading text-2xl leading-snug text-ink sm:text-3xl">
                {tx(review.quote, locale)}
              </p>
              <footer className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <cite className="not-italic font-semibold text-ink">{review.name}</cite>
                  <p className="text-sm text-muted">
                    {tx(review.date, locale)} · {ui.reviews.verified}
                  </p>
                </div>
                <span className="rounded-full bg-warm px-3 py-1 text-sm font-semibold text-navy">
                  {review.rating.toFixed(1)} / 10
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-1.5">
              {reviews.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.name}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-navy" : "w-2 bg-navy/20"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label={ui.reviews.prev}
                onClick={() => step(-1)}
                className="grid size-11 place-items-center rounded-full bg-white text-ink shadow-md"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label={ui.reviews.next}
                onClick={() => step(1)}
                className="grid size-11 place-items-center rounded-full bg-navy text-white shadow-md"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

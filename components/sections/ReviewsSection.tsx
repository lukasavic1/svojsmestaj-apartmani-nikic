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
    <section id="utisci" className="bg-warm px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker={ui.reviews.kicker}
            heading={ui.reviews.heading}
            lead={ui.reviews.lead}
          />
          <div className="shrink-0 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <p className="font-heading text-2xl text-ink">
              {site.rating.bookingScore}
              <span className="text-sm text-muted"> / 10</span>
            </p>
            <p className="text-xs text-muted">
              {ui.reviews.basedOn.replace("{n}", String(site.rating.count))}
            </p>
            <div className="mt-1 flex gap-0.5 text-gold-deep">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3 fill-current" />
              ))}
            </div>
          </div>
        </div>

        <div ref={ref} className="relative mt-6">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              className="rounded-2xl bg-white px-5 py-4 shadow-sm"
            >
              <Quote className="size-5 text-gold" />
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink sm:text-base">
                {tx(review.quote, locale)}
              </p>
              <footer className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                <div>
                  <cite className="not-italic font-semibold text-ink">{review.name}</cite>
                  <span className="text-muted"> · {tx(review.date, locale)}</span>
                </div>
                <span className="rounded-full bg-warm px-2.5 py-0.5 text-xs font-semibold text-navy">
                  {review.rating.toFixed(1)} / 10
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-1.5">
              {reviews.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.name}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-navy" : "w-2 bg-navy/20"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label={ui.reviews.prev}
                onClick={() => step(-1)}
                className="grid size-9 place-items-center rounded-full bg-white text-ink shadow-sm"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label={ui.reviews.next}
                onClick={() => step(1)}
                className="grid size-9 place-items-center rounded-full bg-navy text-white shadow-sm"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

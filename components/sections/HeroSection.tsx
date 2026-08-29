"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { tx } from "@/lib/i18n";
import { easeOutExpo, fadeInUp, stagger } from "@/lib/motion";
import { useSite } from "@/components/providers/SiteProvider";

const SLIDES = media.home;

export function HeroSection() {
  const { locale, ui, openBooking } = useSite();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden bg-navy text-white">
      <AnimatePresence>
        <motion.div
          key={SLIDES[index]}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.9, ease: easeOutExpo },
            scale: { duration: 7.2, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[index]}
            alt={tx(site.tagline, locale)}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-navy/55 via-navy/35 to-navy/80" />

      <div className="relative mx-auto flex min-h-[78vh] w-full max-w-[1200px] flex-col justify-end px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.18em] text-gold uppercase backdrop-blur-md"
          >
            {ui.hero.badge}
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="mt-6 font-heading text-[2.35rem] leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[4.1rem]"
          >
            {ui.hero.headline}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg"
          >
            {tx(site.subTagline, locale)}
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#apartmani"
              className="inline-flex h-12 items-center rounded-full bg-gold px-6 text-[0.75rem] font-semibold tracking-[0.14em] text-navy uppercase shadow-lg shadow-gold/25 transition hover:bg-gold-deep hover:text-white"
            >
              {ui.hero.ctaApartments}
            </a>
            <button
              type="button"
              onClick={() => openBooking()}
              className="inline-flex h-12 items-center rounded-full border border-white/30 bg-white/10 px-6 text-[0.75rem] font-semibold tracking-[0.14em] uppercase backdrop-blur-md transition hover:bg-white/20"
            >
              {ui.hero.ctaAvailability}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

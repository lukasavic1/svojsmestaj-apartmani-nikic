"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { apartments } from "@/data/apartments";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { tx } from "@/lib/i18n";
import { easeOutExpo, fadeInUp, stagger } from "@/lib/motion";
import { useSite } from "@/components/providers/SiteProvider";

const SLIDES = media.home;

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function HeroSection() {
  const { locale, ui, openBooking } = useSite();
  const [index, setIndex] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [apartmentId, setApartmentId] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    openBooking({
      checkIn: checkIn || undefined,
      checkOut: checkOut || undefined,
      guests,
      apartmentId: apartmentId || undefined,
    });
  };

  return (
    <section className="relative isolate min-h-[85vh] overflow-hidden bg-navy text-white">
      <AnimatePresence>
        <motion.div
          key={SLIDES[index]}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1.1 }}
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
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-navy/55 via-navy/35 to-navy/80" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_80%_-10%,rgba(197,168,128,0.22),transparent_55%)]" />

      <div className="relative mx-auto flex min-h-[85vh] w-full max-w-[1200px] flex-col justify-end px-4 pb-28 pt-32 sm:px-6 lg:px-8 lg:pb-32">
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

        <motion.form
          onSubmit={onSearch}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: easeOutExpo }}
          className="mt-10 w-full rounded-3xl border border-white/20 bg-white/80 p-3 shadow-xl shadow-slate-900/20 backdrop-blur-md sm:p-4"
        >
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-[1fr_1fr_0.7fr_1.2fr_auto]">
            <label className="rounded-2xl bg-white px-3 py-2.5">
              <span className="block text-[0.62rem] font-semibold tracking-[0.14em] text-muted uppercase">
                {ui.hero.checkIn}
              </span>
              <input
                type="date"
                min={todayIso()}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="mt-1 w-full bg-transparent text-sm text-ink outline-none"
              />
            </label>
            <label className="rounded-2xl bg-white px-3 py-2.5">
              <span className="block text-[0.62rem] font-semibold tracking-[0.14em] text-muted uppercase">
                {ui.hero.checkOut}
              </span>
              <input
                type="date"
                min={checkIn || todayIso()}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="mt-1 w-full bg-transparent text-sm text-ink outline-none"
              />
            </label>
            <label className="rounded-2xl bg-white px-3 py-2.5">
              <span className="block text-[0.62rem] font-semibold tracking-[0.14em] text-muted uppercase">
                {ui.hero.guests}
              </span>
              <input
                type="number"
                min={1}
                max={5}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="mt-1 w-full bg-transparent text-sm text-ink outline-none"
              />
            </label>
            <label className="relative col-span-2 rounded-2xl bg-white px-3 py-2.5 lg:col-span-1">
              <span className="block text-[0.62rem] font-semibold tracking-[0.14em] text-muted uppercase">
                {ui.hero.apartment}
              </span>
              <select
                value={apartmentId}
                onChange={(e) => setApartmentId(e.target.value)}
                className="mt-1 w-full appearance-none bg-transparent pr-6 text-sm text-ink outline-none"
              >
                <option value="">{ui.hero.anyApartment}</option>
                {apartments.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {tx(unit.name, locale)}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 bottom-3 size-4 text-muted" />
            </label>
            <button
              type="submit"
              className="col-span-2 h-full min-h-12 rounded-2xl bg-navy px-6 text-[0.75rem] font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-navy-soft lg:col-span-1"
            >
              {ui.hero.search}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useSite } from "@/components/providers/SiteProvider";

export function FloatingBookingButton() {
  const { ui, openBooking, bookingOpen } = useSite();

  if (bookingOpen) return null;

  return (
    <motion.button
      type="button"
      onClick={() => openBooking()}
      aria-label={ui.nav.book}
      className={`fixed right-5 bottom-5 z-40 inline-flex items-center gap-1.5 rounded-full bg-[#C5A880] px-3.5 py-2 text-[0.65rem] font-semibold tracking-[0.12em] text-slate-900 uppercase shadow-xl ${
        bookingOpen ? "pointer-events-none hidden" : ""
      }`}
      animate={{
        scale: [1, 1.06, 1],
        boxShadow: [
          "0px 0px 0px rgba(197,168,128,0)",
          "0px 0px 22px rgba(197,168,128,0.75)",
          "0px 0px 0px rgba(197,168,128,0)",
        ],
      }}
      transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}
    >
      <motion.span
        className="grid size-6 place-items-center rounded-full bg-navy text-[#C5A880]"
        animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2.4, repeatDelay: 1.6 }}
      >
        <Sparkles className="size-3.5 fill-current" />
      </motion.span>
      {ui.nav.book}
    </motion.button>
  );
}

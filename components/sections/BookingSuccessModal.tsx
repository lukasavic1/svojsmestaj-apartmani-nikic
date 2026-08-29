"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Phone } from "lucide-react";
import { site } from "@/data/site";
import { telHref, whatsappHref } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { easeOutExpo } from "@/lib/motion";
import { useIsClient } from "@/hooks/useIsClient";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useSite } from "@/components/providers/SiteProvider";

export type BookingReceipt = {
  apartmentName: string;
  period: string;
  guests: number;
  whatsappText?: string;
};

type Props = {
  open: boolean;
  receipt: BookingReceipt | null;
  onClose: () => void;
};

export function BookingSuccessModal({ open, receipt, onClose }: Props) {
  const { ui } = useSite();
  const mounted = useIsClient();
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label={ui.booking.close}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-success-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.36, ease: easeOutExpo }}
            className="relative z-10 max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border-t-4 border-[#C5A880] bg-[#FAF9F6] px-6 py-8 shadow-2xl sm:max-w-lg sm:rounded-3xl sm:px-8"
          >
            <div className="flex justify-center">
              <span className="relative grid size-16 place-items-center">
                <motion.span
                  className="absolute inset-0 rounded-full bg-[#C5A880]/35"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.15, 0.55] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <span className="relative grid size-14 place-items-center rounded-full bg-[#C5A880] text-navy shadow-lg shadow-[#C5A880]/30">
                  <Check className="size-7 stroke-[2.5]" />
                </span>
              </span>
            </div>

            <h3
              id="booking-success-title"
              className="mt-5 text-center font-heading text-2xl text-slate-900 md:text-3xl"
            >
              {ui.booking.successTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-muted md:text-base">
              {ui.booking.successBody}
            </p>

            {receipt ? (
              <div className="mt-6 space-y-2.5 rounded-2xl border border-slate-200/80 bg-white px-4 py-4 text-left text-sm">
                <p className="flex justify-between gap-4">
                  <span className="text-muted">{ui.booking.apartment}</span>
                  <span className="font-semibold text-ink">{receipt.apartmentName}</span>
                </p>
                <p className="flex justify-between gap-4">
                  <span className="text-muted">{ui.booking.summaryPeriod}</span>
                  <span className="text-right font-semibold text-ink">{receipt.period}</span>
                </p>
                <p className="flex justify-between gap-4">
                  <span className="text-muted">{ui.booking.summaryGuests}</span>
                  <span className="font-semibold text-ink">{receipt.guests}</span>
                </p>
              </div>
            ) : null}

            <a
              href={telHref()}
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0F1D2A] text-[0.72rem] font-semibold tracking-[0.1em] text-white uppercase transition hover:scale-[1.02] hover:bg-[#C5A880] hover:text-navy hover:shadow-lg hover:shadow-[#C5A880]/25"
            >
              <Phone className="size-4" />
              {ui.booking.successCall} · {site.contact.phoneDisplay}
            </a>
            <a
              href={whatsappHref(receipt?.whatsappText)}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-600 text-[0.72rem] font-semibold tracking-[0.1em] text-white uppercase transition hover:bg-emerald-700"
            >
              <WhatsAppIcon className="size-4" />
              {ui.booking.successWhatsapp}
            </a>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full border border-slate-200 text-[0.72rem] font-semibold tracking-[0.1em] uppercase transition hover:bg-slate-100"
            >
              {ui.booking.close}
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

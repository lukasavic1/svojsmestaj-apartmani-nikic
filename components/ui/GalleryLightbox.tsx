"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/types/apartment";
import { tx } from "@/lib/i18n";
import { useSwipeIndex } from "@/hooks/useSwipeIndex";
import { useIsClient } from "@/hooks/useIsClient";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useSite } from "@/components/providers/SiteProvider";

type Props = {
  open: boolean;
  title: string;
  photos: Photo[];
  onClose: () => void;
  startIndex?: number;
};

export function GalleryLightbox({
  open,
  title,
  photos,
  onClose,
  startIndex = 0,
}: Props) {
  const { locale, ui } = useSite();
  const mounted = useIsClient();
  const [index, setIndex] = useState(startIndex);
  const stageRef = useRef<HTMLDivElement>(null);
  const count = photos.length;

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const step = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + count) % count);
    },
    [count]
  );

  useSwipeIndex(stageRef, { count, onSwipe: step });
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, step]);

  if (!mounted) return null;
  const current = photos[index];

  return createPortal(
    <AnimatePresence>
      {open && current ? (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-navy/92 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div>
              <p className="font-heading text-lg sm:text-xl">{title}</p>
              <p className="text-xs text-white/60">
                {index + 1} / {count}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={ui.apartments.close}
              className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
          </div>

          <div ref={stageRef} className="relative mx-auto min-h-[50vh] w-full max-w-5xl flex-1 px-12 sm:px-16">
            <Image
              src={current.src}
              alt={tx(current.alt, locale)}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            {count > 1 ? (
              <>
                <button
                  type="button"
                  aria-label={ui.apartments.prev}
                  onClick={() => step(-1)}
                  className="absolute top-1/2 left-2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/15 hover:bg-white/30"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label={ui.apartments.next}
                  onClick={() => step(1)}
                  className="absolute top-1/2 right-2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/15 hover:bg-white/30"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            ) : null}
          </div>

          <div className="flex gap-2 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6">
            {photos.map((photo, i) => (
              <button
                key={`${photo.src}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative h-14 w-16 shrink-0 overflow-hidden rounded-lg ring-2 ${
                  i === index ? "ring-gold" : "ring-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={photo.src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

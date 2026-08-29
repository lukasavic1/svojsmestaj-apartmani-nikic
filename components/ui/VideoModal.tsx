"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { useIsClient } from "@/hooks/useIsClient";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

type Props = {
  open: boolean;
  youtubeId: string | null;
  title: string;
  onClose: () => void;
  closeLabel: string;
};

export function VideoModal({ open, youtubeId, title, onClose, closeLabel }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const mounted = useIsClient();
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && youtubeId ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: easeOutExpo }}
        >
          <button
            type="button"
            aria-label={closeLabel}
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.36, ease: easeOutExpo }}
            className="relative z-10 w-full max-w-5xl"
          >
            <div className="mb-3 flex items-center justify-between gap-3 text-white">
              <p className="font-heading text-lg sm:text-xl">{title}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              <iframe
                title={title}
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

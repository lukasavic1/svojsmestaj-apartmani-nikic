"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeIndex } from "@/hooks/useSwipeIndex";
import type { Photo } from "@/types/apartment";
import { tx } from "@/lib/i18n";
import type { Locale } from "@/types/locale";

type Props = {
  photos: Photo[];
  locale: Locale;
  className?: string;
  sizes?: string;
  prevLabel: string;
  nextLabel: string;
  priority?: boolean;
  index?: number;
  onIndexChange?: (index: number) => void;
  onImageClick?: () => void;
};

export function PhotoCarousel({
  photos,
  locale,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  prevLabel,
  nextLabel,
  priority = false,
  index: controlledIndex,
  onIndexChange,
  onImageClick,
}: Props) {
  const [uncontrolled, setUncontrolled] = useState(0);
  const index = controlledIndex ?? uncontrolled;
  const setIndex = useCallback(
    (next: number) => {
      if (onIndexChange) onIndexChange(next);
      else setUncontrolled(next);
    },
    [onIndexChange]
  );
  const ref = useRef<HTMLDivElement>(null);
  const count = photos.length;

  const step = useCallback(
    (dir: 1 | -1) => {
      setIndex((index + dir + count) % count);
    },
    [count, index, setIndex]
  );

  useSwipeIndex(ref, { count, onSwipe: step });

  const current = photos[index];
  if (!current) return null;

  return (
    <div ref={ref} className={`relative overflow-hidden bg-navy/10 ${className}`}>
      <Image
        src={current.src}
        alt={tx(current.alt, locale)}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-transform duration-700 ${onImageClick ? "cursor-zoom-in" : "hover:scale-105"}`}
        onClick={onImageClick}
      />
      {count > 1 ? (
        <>
          <button
            type="button"
            aria-label={prevLabel}
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute top-1/2 left-2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur-md"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute top-1/2 right-2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur-md"
          >
            <ChevronRight className="size-4" />
          </button>
          {count <= 8 ? (
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {photos.map((photo, i) => (
                <button
                  key={`${photo.src}-${i}`}
                  type="button"
                  aria-label={`${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          ) : (
            <span className="absolute right-3 bottom-3 z-10 rounded-full bg-navy/70 px-2.5 py-1 text-[0.7rem] font-semibold text-white backdrop-blur-md">
              {index + 1} / {count}
            </span>
          )}
        </>
      ) : null}
    </div>
  );
}

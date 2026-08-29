"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/types/locale";
import { useSite } from "@/components/providers/SiteProvider";

function Flag({ locale }: { locale: Locale }) {
  if (locale === "en") {
    return (
      <svg className="h-3 w-4 shrink-0 overflow-hidden rounded-[2px]" viewBox="0 0 16 12" aria-hidden="true">
        <rect width="16" height="12" fill="#012169" />
        <path d="M0 0 L16 12 M16 0 L0 12" stroke="#fff" strokeWidth="2.2" />
        <path d="M0 0 L16 12 M16 0 L0 12" stroke="#c8102e" strokeWidth="1.1" />
        <path d="M8 0 V12 M0 6 H16" stroke="#fff" strokeWidth="3.4" />
        <path d="M8 0 V12 M0 6 H16" stroke="#c8102e" strokeWidth="1.8" />
      </svg>
    );
  }
  return (
    <svg className="h-3 w-4 shrink-0 overflow-hidden rounded-[2px]" viewBox="0 0 16 12" aria-hidden="true">
      <rect width="16" height="12" fill="#C40318" />
      <path
        fill="#D4AF2A"
        d="M8 2.1c.55.05 1.15.45 1.55 1.05.35-.4.85-.65 1.35-.55.1.95-.25 1.7-.85 2.2.45.2.8.55 1 .95H5.95c.2-.4.55-.75 1-.95-.6-.5-.95-1.25-.85-2.2.5-.1 1 .15 1.35.55C6.85 2.55 7.45 2.15 8 2.1Zm-2.35 3.95h4.7c.15.85-.2 1.45-.85 1.85L8 9.1l-1.5-1.2c-.65-.4-1-1-.85-1.85Z"
      />
      <circle cx="8" cy="4.55" r=".45" fill="#C40318" />
    </svg>
  );
}

export function LanguageToggle({ inverted = false }: { inverted?: boolean }) {
  const { locale, setLocale } = useSite();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-11 items-center gap-2 rounded-full px-3 text-[0.72rem] font-semibold tracking-[0.12em] transition ${
          inverted
            ? "text-white/90 hover:bg-white/10"
            : "text-ink/80 hover:bg-navy/5"
        }`}
      >
        <Flag locale={locale} />
        {LOCALE_LABELS[locale]}
        <ChevronDown className={`size-3.5 opacity-70 ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 min-w-[8.5rem] overflow-hidden rounded-2xl bg-white py-1 shadow-xl shadow-slate-200/70 ring-1 ring-navy/8"
        >
          {LOCALES.map((id) => (
            <li key={id}>
              <button
                type="button"
                role="option"
                aria-selected={id === locale}
                className={`flex w-full items-center gap-2 px-3 py-2.5 text-sm ${
                  id === locale ? "bg-warm text-ink" : "text-muted hover:bg-cream"
                }`}
                onClick={() => {
                  setLocale(id);
                  setOpen(false);
                }}
              >
                <Flag locale={id} />
                {LOCALE_LABELS[id]}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

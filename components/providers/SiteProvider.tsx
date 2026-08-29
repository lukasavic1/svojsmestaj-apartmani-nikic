"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getUi, type UiDictionary } from "@/content/ui";
import { DEFAULT_LOCALE, LOCALE_HTML, type Locale } from "@/types/locale";
import { parseLocaleParam } from "@/lib/i18n";

export type BookingPrefill = {
  apartmentId?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
};

type SiteContextValue = {
  locale: Locale;
  ui: UiDictionary;
  setLocale: (locale: Locale) => void;
  bookingOpen: boolean;
  bookingPrefill: BookingPrefill;
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [locale, setLocaleState] = useState<Locale>(
    parseLocaleParam(searchParams.get("lang")) ?? DEFAULT_LOCALE
  );
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<BookingPrefill>({});

  const syncUrl = useCallback(
    (next: Locale) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next === DEFAULT_LOCALE) params.delete("lang");
      else params.set("lang", next);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      syncUrl(next);
      if (typeof document !== "undefined") {
        document.documentElement.lang = LOCALE_HTML[next];
      }
    },
    [syncUrl]
  );

  useEffect(() => {
    document.documentElement.lang = LOCALE_HTML[locale];
  }, [locale]);

  const openBooking = useCallback((prefill?: BookingPrefill) => {
    setBookingPrefill(prefill ?? {});
    setBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => setBookingOpen(false), []);

  const value = useMemo<SiteContextValue>(
    () => ({
      locale,
      ui: getUi(locale),
      setLocale,
      bookingOpen,
      bookingPrefill,
      openBooking,
      closeBooking,
    }),
    [locale, setLocale, bookingOpen, bookingPrefill, openBooking, closeBooking]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}

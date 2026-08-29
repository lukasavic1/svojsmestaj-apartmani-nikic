export const LOCALES = ["sr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "sr";

export const LOCALE_LABELS: Record<Locale, string> = {
  sr: "MNE",
  en: "ENG",
};

export const LOCALE_HTML: Record<Locale, string> = {
  sr: "sr-Latn",
  en: "en",
};

export type LocalizedString = Record<Locale, string>;
export type LocalizedStringList = Record<Locale, string[]>;

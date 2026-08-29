import type { Locale } from "@/types/locale";
import { uiEn } from "./en";
import { uiSr } from "./sr";
import type { UiDictionary } from "./types";

export type { UiDictionary } from "./types";

export function getUi(locale: Locale): UiDictionary {
  return locale === "en" ? uiEn : uiSr;
}

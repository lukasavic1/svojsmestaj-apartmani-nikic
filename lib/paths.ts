import type { Locale } from "@/types/locale";

export function withLang(href: string, locale: Locale): string {
  if (locale !== "en") return href;
  const [pathAndQuery, hash] = href.split("#");
  const [path, existing] = pathAndQuery.split("?");
  const params = new URLSearchParams(existing ?? "");
  params.set("lang", "en");
  const q = params.toString();
  return `${path}?${q}${hash ? `#${hash}` : ""}`;
}

export function apartmentHref(slug: string, locale: Locale): string {
  return withLang(`/apartman/${slug}`, locale);
}

import { site } from "@/data/site";
import type { Locale } from "@/types/locale";
import { t2 } from "./i18n";

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  apartmentName: string;
  guests: number;
  message?: string;
};

export function whatsappHref(text?: string): string {
  const base = `https://wa.me/${site.contact.whatsappRaw}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function formatInquiryMessage(payload: InquiryPayload, locale: Locale): string {
  const lines = [
    t2(
      locale,
      "Zdravo Irena, želim da rezervišem boravak u Apartmanima Nikić.",
      "Hello Irena, I would like to request a stay at Apartmani Nikić."
    ),
    "",
    `${t2(locale, "Ime", "Name")}: ${payload.name}`,
    `${t2(locale, "Email", "Email")}: ${payload.email}`,
    `${t2(locale, "Telefon", "Phone")}: ${payload.phone}`,
    `${t2(locale, "Apartman", "Apartment")}: ${payload.apartmentName}`,
    `${t2(locale, "Prijava", "Check-in")}: ${payload.checkIn}`,
    `${t2(locale, "Odjava", "Check-out")}: ${payload.checkOut}`,
    `${t2(locale, "Gosti", "Guests")}: ${payload.guests}`,
  ];

  if (payload.message?.trim()) {
    lines.push(`${t2(locale, "Poruka", "Message")}: ${payload.message.trim()}`);
  }

  return lines.join("\n");
}

export function telHref(): string {
  return `tel:+${site.contact.whatsappRaw}`;
}

export function viberHref(): string {
  return `viber://chat?number=%2B${site.contact.whatsappRaw}`;
}

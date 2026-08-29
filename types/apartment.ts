import type { LocalizedString, LocalizedStringList } from "./locale";

export type Photo = {
  src: string;
  alt: LocalizedString;
};

export type Apartment = {
  id: string;
  slug: string;
  number: string;
  accent: string;
  name: LocalizedString;
  sizeSqm: number;
  capacity: number;
  beds: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNight: number | null;
  calendarId: number | null;
  sourceUrl: string;
  fullyBooked?: boolean;
  hook: LocalizedString;
  description: LocalizedString;
  layout: LocalizedString;
  tags: LocalizedStringList;
  amenityKeys: AmenityKey[];
  photos: Photo[];
};

export type AmenityKey =
  | "sea"
  | "beach"
  | "parking"
  | "wifi"
  | "ac"
  | "terrace"
  | "kitchen"
  | "bathroom"
  | "tv"
  | "washer"
  | "entrance"
  | "mountain"
  | "entire"
  | "transfer"
  | "capacity";

export type Highlight = {
  id: string;
  icon: AmenityKey;
  title: LocalizedString;
  body: LocalizedString;
};

export type Distance = {
  id: string;
  value: LocalizedString;
  label: LocalizedString;
};

export type Review = {
  id: string;
  name: string;
  date: LocalizedString;
  source: "Booking.com" | "Airbnb";
  rating: number;
  quote: LocalizedString;
  country?: string;
};

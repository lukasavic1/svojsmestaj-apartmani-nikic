import type { AmenityKey } from "@/types/apartment";
import {
  AirVent,
  Bath,
  Car,
  DoorOpen,
  Home,
  Mountain,
  Plane,
  Sunset,
  Tv,
  Umbrella,
  Users,
  UtensilsCrossed,
  WashingMachine,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<AmenityKey, LucideIcon> = {
  sea: Waves,
  beach: Umbrella,
  parking: Car,
  wifi: Wifi,
  ac: AirVent,
  terrace: Sunset,
  kitchen: UtensilsCrossed,
  bathroom: Bath,
  tv: Tv,
  washer: WashingMachine,
  entrance: DoorOpen,
  mountain: Mountain,
  entire: Home,
  transfer: Plane,
  capacity: Users,
};

const LABELS: Record<AmenityKey, { sr: string; en: string }> = {
  sea: { sr: "Pogled na more", en: "Sea view" },
  beach: { sr: "Plaža 50 m", en: "Beach 50 m" },
  parking: { sr: "Besplatan parking", en: "Free parking" },
  wifi: { sr: "WiFi", en: "WiFi" },
  ac: { sr: "Klima", en: "A/C" },
  terrace: { sr: "Terasa / balkon", en: "Terrace / balcony" },
  kitchen: { sr: "Opremljena kuhinja", en: "Equipped kitchen" },
  bathroom: { sr: "Sopstveno kupatilo", en: "Private bathroom" },
  tv: { sr: "Smart TV", en: "Smart TV" },
  washer: { sr: "Mašina za veš", en: "Washing machine" },
  entrance: { sr: "Privatni ulaz", en: "Private entrance" },
  mountain: { sr: "Pogled na planinu", en: "Mountain view" },
  entire: { sr: "Izdaje se u cjelosti", en: "Rented in full" },
  transfer: { sr: "Prevoz od/do aerodroma", en: "Airport transfer" },
  capacity: { sr: "Kapacitet 3–5 osoba", en: "Sleeps 3–5" },
};

export function AmenityIcon({
  name,
  className,
}: {
  name: AmenityKey;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" />;
}

export function amenityLabel(name: AmenityKey, locale: "sr" | "en"): string {
  return LABELS[name][locale];
}

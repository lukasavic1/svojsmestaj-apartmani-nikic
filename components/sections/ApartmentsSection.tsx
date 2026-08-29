"use client";

import { useMemo, useState } from "react";
import { apartments } from "@/data/apartments";
import { tx } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import { useSite } from "@/components/providers/SiteProvider";
import { ApartmentCard } from "./ApartmentCard";

type Filter = "all" | "studio" | "family" | "five";

export function ApartmentsSection() {
  const { locale, ui } = useSite();
  const [filter, setFilter] = useState<Filter>("all");
  const [galleryId, setGalleryId] = useState<string | null>(null);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: ui.apartments.filterAll },
    { id: "studio", label: ui.apartments.filterStudio },
    { id: "family", label: ui.apartments.filterFamily },
    { id: "five", label: ui.apartments.filterFive },
  ];

  const visible = useMemo(() => {
    return apartments.filter((unit) => {
      if (filter === "studio") return unit.id === "studio";
      if (filter === "family") return unit.capacity >= 4 && unit.bedrooms >= 1;
      if (filter === "five") return unit.capacity >= 5;
      return true;
    });
  }, [filter]);

  const galleryUnit = apartments.find((unit) => unit.id === galleryId);

  return (
    <section id="apartmani" className="bg-cream px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          kicker={ui.apartments.kicker}
          heading={ui.apartments.heading}
          lead={ui.apartments.lead}
        />

        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`h-9 rounded-full px-4 text-[0.72rem] font-semibold tracking-[0.12em] uppercase transition ${
                filter === item.id
                  ? "bg-navy text-white"
                  : "bg-white text-ink/70 shadow-sm hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((unit) => (
            <ApartmentCard
              key={unit.id}
              apartment={unit}
              onOpenGallery={() => setGalleryId(unit.id)}
            />
          ))}
        </div>
      </div>

      <GalleryLightbox
        open={Boolean(galleryUnit)}
        title={galleryUnit ? tx(galleryUnit.name, locale) : ""}
        photos={galleryUnit?.photos ?? []}
        onClose={() => setGalleryId(null)}
      />
    </section>
  );
}

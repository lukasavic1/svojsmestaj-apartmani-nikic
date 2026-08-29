"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { apartments } from "@/data/apartments";
import { stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSite } from "@/components/providers/SiteProvider";
import { ApartmentCard } from "./ApartmentCard";

type Filter = "all" | "studio" | "family" | "five";

export function ApartmentsSection() {
  const { ui } = useSite();
  const [filter, setFilter] = useState<Filter>("all");

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

  return (
    <section id="apartmani" className="bg-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          kicker={ui.apartments.kicker}
          heading={ui.apartments.heading}
          lead={ui.apartments.lead}
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`h-10 rounded-full px-4 text-[0.72rem] font-semibold tracking-[0.12em] uppercase transition ${
                filter === item.id
                  ? "bg-navy text-white"
                  : "bg-white text-ink/70 shadow-sm hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-6% 0px" }}
          className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((unit) => (
              <ApartmentCard key={unit.id} apartment={unit} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

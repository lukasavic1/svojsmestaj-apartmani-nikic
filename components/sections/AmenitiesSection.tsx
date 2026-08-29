"use client";

import { motion } from "framer-motion";
import { highlights } from "@/data/reviews";
import { tx } from "@/lib/i18n";
import { fadeInUp, stagger } from "@/lib/motion";
import { AmenityIcon } from "@/components/ui/AmenityIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSite } from "@/components/providers/SiteProvider";

export function AmenitiesSection() {
  const { locale, ui } = useSite();

  return (
    <section className="bg-warm px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          kicker={ui.amenities.kicker}
          heading={ui.amenities.heading}
          lead={ui.amenities.lead}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {highlights.map((item) => (
            <motion.article
              key={item.id}
              variants={fadeInUp}
              className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2.5 shadow-sm"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-cream text-gold-deep">
                <AmenityIcon name={item.icon} className="size-4" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-ink">{tx(item.title, locale)}</h3>
                <p className="text-xs text-muted">{tx(item.body, locale)}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

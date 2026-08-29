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
    <section className="bg-warm px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
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
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {highlights.map((item) => (
            <motion.article
              key={item.id}
              variants={fadeInUp}
              className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-cream text-gold-deep">
                <AmenityIcon name={item.icon} className="size-6" />
              </span>
              <h3 className="mt-5 font-heading text-2xl text-ink">
                {tx(item.title, locale)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {tx(item.body, locale)}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

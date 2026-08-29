"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { distances } from "@/data/reviews";
import { site } from "@/data/site";
import { tx } from "@/lib/i18n";
import { fadeInUp, stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSite } from "@/components/providers/SiteProvider";

export function LocationSection() {
  const { locale, ui } = useSite();

  return (
    <section id="lokacija" className="bg-navy px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            kicker={ui.location.kicker}
            heading={ui.location.heading}
            lead={ui.location.lead}
            light
          />
          <p className="mt-6 max-w-xl text-white/70">{ui.location.body}</p>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-2 gap-3"
          >
            {distances.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
              >
                <p className="font-heading text-2xl text-gold">{tx(item.value, locale)}</p>
                <p className="mt-1 text-sm text-white/70">{tx(item.label, locale)}</p>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-8 flex items-start gap-3 text-sm text-white/70">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
            <div>
              <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">
                {ui.location.addressLabel}
              </p>
              <p className="mt-1 text-white">
                {site.location.street}, {site.location.locality}
                <br />
                {site.location.postalCode} {site.location.city}, {tx(site.location.country, locale)}
              </p>
              <a
                href={site.location.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-gold hover:text-white"
              >
                {ui.location.directions}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] shadow-xl shadow-black/30 ring-1 ring-white/10">
          <iframe
            title={ui.location.heading}
            src={site.location.mapsEmbed}
            className="h-[340px] w-full border-0 sm:h-[420px] lg:h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

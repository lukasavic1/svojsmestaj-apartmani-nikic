"use client";

import { motion } from "framer-motion";
import { Car, Handshake, Umbrella, Waves } from "lucide-react";
import { valueBar } from "@/data/reviews";
import { tx } from "@/lib/i18n";
import { fadeInUp, stagger } from "@/lib/motion";
import { useSite } from "@/components/providers/SiteProvider";

const ICONS = [Umbrella, Car, Waves, Handshake] as const;

export function FeatureBar() {
  const { locale } = useSite();

  return (
    <section className="relative z-10 -mt-6 px-4 sm:-mt-8 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-6% 0px" }}
        className="mx-auto grid max-w-[1200px] grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 md:grid-cols-4"
      >
        {valueBar.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="flex items-center gap-3 border-b border-navy/6 px-4 py-4 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-warm text-gold-deep">
                <Icon className="size-4" />
              </span>
              <div>
                <p className="font-heading text-base leading-none text-ink">
                  {typeof item.value === "string" ? item.value : tx(item.value, locale)}
                </p>
                <p className="mt-1 text-sm text-muted">{tx(item.label, locale)}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

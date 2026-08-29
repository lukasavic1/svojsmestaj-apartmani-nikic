"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { tx } from "@/lib/i18n";
import { fadeInUp } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSite } from "@/components/providers/SiteProvider";

export function AboutSection() {
  const { locale, ui } = useSite();

  return (
    <section id="o-nama" className="bg-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="relative overflow-hidden rounded-[2rem] shadow-xl shadow-slate-200/50"
        >
          <div className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={media.about}
              alt="Apartmani Nikić, Lepetane"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-6 text-white">
            <p className="text-[0.68rem] tracking-[0.18em] text-gold uppercase">
              {ui.about.hostsLabel}
            </p>
            <p className="mt-1 font-heading text-2xl">{tx(site.hosts, locale)}</p>
            <p className="mt-1 text-sm text-white/75">{ui.about.welcome}</p>
          </div>
        </motion.div>
        <div>
          <SectionHeading
            kicker={ui.about.kicker}
            heading={ui.about.heading}
            lead={ui.about.lead}
          />
          <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-ink/80">
            {ui.about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

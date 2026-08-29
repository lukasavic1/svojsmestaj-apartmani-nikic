"use client";

import Image from "next/image";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { tx } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSite } from "@/components/providers/SiteProvider";

export function AboutSection() {
  const { locale, ui } = useSite();

  return (
    <section id="o-nama" className="bg-cream px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-[1200px] items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative overflow-hidden rounded-[1.5rem] shadow-lg shadow-slate-200/40">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={media.about}
              alt="Apartmani Nikić, Lepetane"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-5 text-white">
            <p className="text-[0.68rem] tracking-[0.18em] text-gold uppercase">
              {ui.about.hostsLabel}
            </p>
            <p className="mt-1 font-heading text-xl">{tx(site.hosts, locale)}</p>
          </div>
        </div>
        <div>
          <SectionHeading
            kicker={ui.about.kicker}
            heading={ui.about.heading}
            lead={ui.about.lead}
          />
          <div className="mt-5 space-y-3 text-[0.98rem] leading-relaxed text-ink/80">
            {ui.about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

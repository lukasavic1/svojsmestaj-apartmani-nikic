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
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
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
          <p className="mt-6 text-[0.68rem] tracking-[0.18em] text-gold-deep uppercase">
            {ui.about.hostsLabel}
          </p>
          <p className="mt-1 font-heading text-xl text-ink">{tx(site.hosts, locale)}</p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl shadow-slate-300/40 lg:aspect-[5/6]">
          <Image
            src={media.about}
            alt={tx(site.tagline, locale)}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}

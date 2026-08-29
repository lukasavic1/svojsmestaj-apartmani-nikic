"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { featuredVideo, reelVideos, type VideoItem } from "@/data/videos";
import { site } from "@/data/site";
import { tx } from "@/lib/i18n";
import { fadeInUp, stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoModal } from "@/components/ui/VideoModal";
import { useSite } from "@/components/providers/SiteProvider";

function YouTubeGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23 12.2s0-3.3-.4-4.8c-.2-.9-.9-1.6-1.8-1.8C19.2 5.2 12 5.2 12 5.2s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 8.9 1 12.2 1 12.2s0 3.3.4 4.8c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.8.4-4.8ZM9.8 15.5v-6.6l6.3 3.3-6.3 3.3Z" />
    </svg>
  );
}

function PlayPulse() {
  return (
    <span className="relative grid size-12 place-items-center sm:size-14">
      <motion.span
        className="absolute inset-0 rounded-full bg-[#C5A880]/40"
        animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0, 0.55] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />
      <span className="relative grid size-11 place-items-center rounded-full bg-[#C5A880] text-navy shadow-lg sm:size-12">
        <Play className="ml-0.5 size-5 fill-current" />
      </span>
    </span>
  );
}

export function VideoShowcaseSection() {
  const { locale, ui } = useSite();
  const [active, setActive] = useState<VideoItem | null>(null);

  return (
    <section id="video" className="bg-navy px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          light
          kicker={ui.video.kicker}
          heading={ui.video.heading}
          lead={ui.video.lead}
        />

        <button
          type="button"
          onClick={() => setActive(featuredVideo)}
          aria-label={`${ui.video.play}: ${tx(featuredVideo.title, locale)}`}
          className="group relative mx-auto mt-8 block w-full max-w-2xl overflow-hidden rounded-2xl shadow-xl shadow-black/40"
        >
          <div className="relative aspect-video">
            <Image
              src={featuredVideo.thumbnail}
              alt={tx(featuredVideo.title, locale)}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-navy/45 transition-colors duration-500 group-hover:bg-navy/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 text-center">
              <PlayPulse />
              <div>
                <p className="font-heading text-lg sm:text-xl">{tx(featuredVideo.title, locale)}</p>
                <p className="mt-1 text-xs text-white/75 sm:text-sm">
                  {tx(featuredVideo.subtitle, locale)}
                </p>
              </div>
            </div>
            <span className="absolute top-3 right-3 rounded-full bg-black/55 px-2 py-0.5 text-[0.65rem] font-semibold">
              {featuredVideo.duration}
            </span>
          </div>
        </button>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="-mx-4 mt-6 flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0"
        >
          {reelVideos.map((video) => (
            <motion.button
              key={video.id}
              type="button"
              variants={fadeInUp}
              onClick={() => setActive(video)}
              aria-label={`${ui.video.play}: ${tx(video.title, locale)}`}
              className="group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl text-left sm:w-auto"
            >
              <div className="relative aspect-video">
                <Image
                  src={video.thumbnail}
                  alt={tx(video.title, locale)}
                  fill
                  sizes="(max-width: 640px) 80vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/35 transition-colors group-hover:bg-navy/50" />
                <span className="absolute top-3 right-3 rounded-full bg-black/55 px-2 py-0.5 text-[0.65rem] font-semibold">
                  {video.duration}
                </span>
                <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#C5A880] text-navy">
                  <Play className="ml-0.5 size-4 fill-current" />
                </span>
              </div>
              <div className="bg-white/5 px-3 py-3 backdrop-blur-md">
                <p className="font-heading text-base">{tx(video.title, locale)}</p>
                <p className="mt-1 text-xs text-white/65">{tx(video.subtitle, locale)}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <YouTubeGlyph className="mt-0.5 size-6 shrink-0 text-[#C5A880]" />
            <p className="text-sm text-white/75">{ui.video.channelLead}</p>
          </div>
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 shrink-0 items-center rounded-full bg-[#C5A880] px-5 text-[0.72rem] font-semibold tracking-[0.12em] text-navy uppercase hover:bg-gold-deep hover:text-white"
          >
            {ui.video.channelCta}
          </a>
        </div>
      </div>

      <VideoModal
        open={Boolean(active)}
        youtubeId={active?.youtubeId ?? null}
        title={active ? tx(active.title, locale) : ""}
        onClose={() => setActive(null)}
        closeLabel={ui.video.close}
      />
    </section>
  );
}

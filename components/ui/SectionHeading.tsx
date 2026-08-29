"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInUp, stagger } from "@/lib/motion";

type Props = {
  kicker?: string;
  heading: string;
  lead?: string;
  align?: "left" | "center";
  light?: boolean;
  children?: ReactNode;
};

export function SectionHeading({
  kicker,
  heading,
  lead,
  align = "left",
  light = false,
}: Props) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {kicker ? (
        <motion.p
          variants={fadeInUp}
          className={`mb-3 text-[0.72rem] font-semibold tracking-[0.22em] uppercase ${
            light ? "text-gold" : "text-gold-deep"
          }`}
        >
          {kicker}
        </motion.p>
      ) : null}
      <motion.h2
        variants={fadeInUp}
        className={`font-heading text-3xl leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {heading}
      </motion.h2>
      <span
        className={`mt-4 block h-[3px] w-12 rounded-full ${
          align === "center" ? "mx-auto" : ""
        } ${light ? "bg-gradient-to-r from-gold to-transparent" : "bg-gradient-to-r from-gold-deep to-transparent"}`}
      />
      {lead ? (
        <motion.p
          variants={fadeInUp}
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            light ? "text-white/75" : "text-muted"
          }`}
        >
          {lead}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

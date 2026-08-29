"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { faqs } from "@/data/faq";
import { site } from "@/data/site";
import { tx } from "@/lib/i18n";
import { telHref, whatsappHref } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSite } from "@/components/providers/SiteProvider";

const CONTACT_WHATSAPP = {
  sr: "Zdravo Irena, interesuje me smeštaj u Apartmanima Nikić",
  en: "Hello Irena, I am interested in a stay at Apartmani Nikić",
} as const;

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-slate-200/70 last:border-b-0">
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-heading text-lg text-ink">{question}</span>
        <ChevronDown
          className={`size-5 shrink-0 text-[#C5A880] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm leading-relaxed text-muted">{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ContactFaqSection() {
  const { locale, ui } = useSite();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const address = `${site.location.street}, ${site.location.locality}, ${site.location.city}, ${tx(site.location.country, locale)}`;

  return (
    <section id="kontakt" className="bg-cream px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          <div className="flex h-full flex-col rounded-3xl border border-slate-200/60 bg-white p-6 shadow-xl shadow-slate-200/40 md:p-8">
            <SectionHeading
              kicker={ui.contact.kicker}
              heading={ui.contact.heading}
              lead={ui.contact.lead}
            />
            <p className="mt-6 text-[0.68rem] tracking-[0.18em] text-gold-deep uppercase">
              {ui.contact.hostsLabel}
            </p>
            <p className="mt-1 font-heading text-2xl text-ink">{tx(site.hosts, locale)}</p>

            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#C5A880]" />
                <div>
                  <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-muted uppercase">
                    {ui.contact.addressLabel}
                  </dt>
                  <dd className="mt-1 text-ink">
                    <a
                      href={site.location.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-navy"
                    >
                      {address}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-[#C5A880]" />
                <div>
                  <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-muted uppercase">
                    {ui.contact.phoneLabel}
                  </dt>
                  <dd className="mt-1">
                    <a href={telHref()} className="font-semibold text-ink hover:text-navy">
                      {site.contact.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-[#C5A880]" />
                <div>
                  <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-muted uppercase">
                    {ui.contact.hoursLabel}
                  </dt>
                  <dd className="mt-1 text-ink">
                    {ui.contact.checkInLabel}: {site.checkIn}
                    <br />
                    {ui.contact.checkOutLabel}: {site.checkOut}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
              <a
                href={telHref()}
                className="inline-flex h-11 min-w-0 items-center justify-center gap-1.5 rounded-full bg-navy px-2 text-[0.62rem] font-semibold tracking-[0.08em] text-white uppercase hover:bg-gold-deep sm:h-12 sm:text-[0.72rem]"
              >
                <Phone className="size-3.5 shrink-0" />
                <span className="truncate">{ui.contact.callCta}</span>
              </a>
              <a
                href={whatsappHref(CONTACT_WHATSAPP[locale])}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 min-w-0 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-2 text-[0.62rem] font-semibold tracking-[0.08em] text-white uppercase hover:bg-emerald-600 sm:h-12 sm:text-[0.72rem]"
              >
                <WhatsAppIcon className="size-3.5 shrink-0" />
                <span className="truncate">{ui.contact.whatsappCta}</span>
              </a>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted">
              <MessageCircle className="size-3.5" />
              {ui.contact.viberNote}
            </p>
          </div>

          <div className="flex h-full flex-col rounded-3xl border border-slate-200/60 bg-[#FDFBF7] p-6 shadow-xl shadow-slate-200/40 md:p-8">
            <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-gold-deep uppercase">
              {ui.contact.faqKicker}
            </p>
            <h3 className="mt-2 font-heading text-3xl text-ink">{ui.contact.faqHeading}</h3>
            <div className="mt-4">
              {faqs.map((item) => (
                <FaqItem
                  key={item.id}
                  question={tx(item.question, locale)}
                  answer={tx(item.answer, locale)}
                  open={openId === item.id}
                  onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

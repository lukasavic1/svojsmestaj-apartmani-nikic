"use client";

import { MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { site } from "@/data/site";
import { tx } from "@/lib/i18n";
import { telHref, viberHref, whatsappHref } from "@/lib/whatsapp";
import { useSite } from "@/components/providers/SiteProvider";

export function SiteFooter() {
  const { locale, ui } = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <p className="font-heading text-2xl">Apartmani Nikić</p>
          <p className="mt-3 text-sm leading-relaxed text-white/65">{ui.footer.tagline}</p>
        </div>
        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-gold uppercase">
            {ui.footer.contact}
          </p>
          <a href={telHref()} className="mt-4 flex items-center gap-2 text-sm hover:text-gold">
            <Phone className="size-4" />
            {site.contact.phoneDisplay}
          </a>
          <a href={whatsappHref()} className="mt-2 block text-sm text-white/70 hover:text-gold">
            WhatsApp
          </a>
          <a href={viberHref()} className="mt-2 block text-sm text-white/70 hover:text-gold">
            Viber
          </a>
          <a
            href={site.location.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-start gap-2 text-sm text-white/70 hover:text-gold"
          >
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {site.location.street}, {site.location.locality}
            <br />
            {site.location.postalCode} {site.location.city}
          </a>
        </div>
        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-gold uppercase">
            {ui.footer.stay}
          </p>
          <p className="mt-4 text-sm text-white/70">
            {ui.footer.checkIn}: {site.checkIn}
          </p>
          <p className="mt-2 text-sm text-white/70">
            {ui.footer.checkOut}: {site.checkOut}
          </p>
          <p className="mt-3 text-sm text-white/55">{tx(site.policies.minStay, locale)}</p>
          <a
            href={site.location.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm text-gold hover:text-white"
          >
            {ui.footer.directions}
          </a>
        </div>
        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-gold uppercase">
            {ui.footer.social}
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid size-11 place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid size-11 place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="grid size-11 place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold"
            >
              <YoutubeIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/45 sm:px-6">
        © {year} {site.legalName}. {ui.footer.rights}
      </div>
    </footer>
  );
}

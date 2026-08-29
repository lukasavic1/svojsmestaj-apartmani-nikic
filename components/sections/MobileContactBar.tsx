"use client";

import { Phone } from "lucide-react";
import { telHref, whatsappHref } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useSite } from "@/components/providers/SiteProvider";

export function MobileContactBar() {
  const { ui, openBooking } = useSite();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/8 bg-white/90 px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(15,23,42,0.08)] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={telHref()}
          className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-cream text-[0.7rem] font-semibold tracking-[0.08em] text-ink uppercase"
        >
          <Phone className="size-4" />
          {ui.mobileBar.call}
        </a>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-[#25D366] text-[0.7rem] font-semibold tracking-[0.08em] text-white uppercase"
        >
          <WhatsAppIcon className="size-4" />
          {ui.mobileBar.whatsapp}
        </a>
        <button
          type="button"
          onClick={() => openBooking()}
          className="inline-flex h-12 items-center justify-center rounded-full bg-navy text-[0.7rem] font-semibold tracking-[0.08em] text-white uppercase"
        >
          {ui.mobileBar.book}
        </button>
      </div>
    </div>
  );
}

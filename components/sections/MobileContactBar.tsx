"use client";

import { Phone } from "lucide-react";
import { telHref, whatsappHref } from "@/lib/whatsapp";
import { useSite } from "@/components/providers/SiteProvider";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.1A11 11 0 1 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.8.6.6-3.7-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.3-.4.2-.3c.1-.1 0-.3 0-.4s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.5 1.4.6 1.9.7 2.6.6.4 0 1.3-.2 1.5-.8s.6-1.1.4-1.2Z" />
    </svg>
  );
}

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
          <WhatsAppGlyph className="size-4" />
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

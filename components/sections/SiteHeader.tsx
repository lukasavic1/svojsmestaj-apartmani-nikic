"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useSite } from "@/components/providers/SiteProvider";
import { useIsClient } from "@/hooks/useIsClient";
import { site } from "@/data/site";
import { media } from "@/data/media";
import { withLang } from "@/lib/paths";
import { telHref, whatsappHref } from "@/lib/whatsapp";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.1A11 11 0 1 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.8.6.6-3.7-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.3-.4.2-.3c.1-.1 0-.3 0-.4s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.5 1.4.6 1.9.7 2.6.6.4 0 1.3-.2 1.5-.8s.6-1.1.4-1.2Z" />
    </svg>
  );
}

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const { ui, locale, openBooking } = useSite();
  const mounted = useIsClient();
  const stuck = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 24,
    () => false
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const scrollY = window.scrollY;
    const { style } = document.body;
    const prev = { overflow: style.overflow, position: style.position, top: style.top, width: style.width };
    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      style.overflow = prev.overflow;
      style.position = prev.position;
      style.top = prev.top;
      style.width = prev.width;
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const inverted = !solid && !stuck && !menuOpen;
  const home = withLang("/", locale);

  const nav = [
    { href: withLang("/#apartmani", locale), label: ui.nav.apartments },
    { href: withLang("/#lokacija", locale), label: ui.nav.location },
    { href: withLang("/#o-nama", locale), label: ui.nav.about },
    { href: withLang("/#utisci", locale), label: ui.nav.reviews },
    { href: withLang("/#kontakt", locale), label: ui.nav.contact },
  ];

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        stuck || solid
          ? "border-b border-white/60 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.35rem] w-full max-w-[1200px] items-center justify-between gap-3 px-4 sm:h-[4.6rem] sm:px-6 lg:px-8">
        <a href={home} className="group flex min-w-0 items-center gap-3">
          <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-sm">
            <Image
              src={media.logo}
              alt={site.name}
              width={80}
              height={80}
              className="h-9 w-9 object-contain"
              unoptimized
            />
          </span>
          <span className="min-w-0">
            <span
              className={`block truncate font-heading text-[1.15rem] leading-none tracking-tight sm:text-xl ${
                inverted ? "text-white" : "text-ink"
              }`}
            >
              {site.name}
            </span>
            <span
              className={`mt-1 block text-[0.62rem] tracking-[0.18em] uppercase ${
                inverted ? "text-white/70" : "text-muted"
              }`}
            >
              Tivat · Lepetane
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[0.78rem] font-semibold tracking-[0.14em] uppercase transition ${
                inverted ? "text-white/80 hover:text-white" : "text-ink/70 hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageToggle inverted={inverted} />
          <a
            href={telHref()}
            className={`hidden h-11 items-center gap-2 rounded-full px-3 text-[0.72rem] font-semibold tracking-[0.08em] uppercase xl:inline-flex ${
              inverted ? "text-white/90 hover:bg-white/10" : "text-ink/80 hover:bg-navy/5"
            }`}
          >
            <Phone className="size-3.5" />
            {ui.nav.call}
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noreferrer"
            className="hidden h-11 items-center gap-2 rounded-full bg-gold px-4 text-[0.72rem] font-semibold tracking-[0.1em] text-navy uppercase shadow-lg shadow-gold/20 transition hover:bg-gold-deep hover:text-white sm:inline-flex"
          >
            <WhatsAppGlyph className="size-3.5" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => openBooking()}
            className={`hidden h-11 items-center rounded-full px-4 text-[0.72rem] font-semibold tracking-[0.1em] uppercase md:inline-flex ${
              inverted
                ? "border border-white/35 text-white hover:bg-white/10"
                : "bg-navy text-white hover:bg-navy-soft"
            }`}
          >
            {ui.nav.book}
          </button>
          <button
            type="button"
            className={`inline-flex size-11 items-center justify-center rounded-full lg:hidden ${
              inverted ? "text-white" : "text-ink"
            }`}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={ui.nav.menu}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {menuOpen ? (
                <motion.div
                  id={menuId}
                  className="fixed inset-0 z-[70] bg-navy text-white lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex h-[4.35rem] items-center justify-between px-4">
                    <span className="font-heading text-xl">{site.name}</span>
                    <button
                      ref={closeRef}
                      type="button"
                      aria-label={ui.nav.close}
                      onClick={closeMenu}
                      className="grid size-11 place-items-center"
                    >
                      <X className="size-6" />
                    </button>
                  </div>
                  <nav className="flex flex-col gap-1 px-6 pt-6">
                    {nav.map((item, i) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                        className="border-b border-white/10 py-4 font-heading text-3xl"
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </nav>
                  <div className="mt-8 flex flex-col gap-3 px-6">
                    <a
                      href={whatsappHref()}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold font-semibold tracking-[0.12em] text-navy uppercase"
                    >
                      WhatsApp · {site.contact.phoneDisplay}
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        closeMenu();
                        openBooking();
                      }}
                      className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 font-semibold tracking-[0.12em] uppercase"
                    >
                      {ui.nav.book}
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </header>
  );
}

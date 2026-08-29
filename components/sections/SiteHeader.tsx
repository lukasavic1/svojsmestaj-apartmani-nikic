"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useSite } from "@/components/providers/SiteProvider";
import { useIsClient } from "@/hooks/useIsClient";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { site } from "@/data/site";
import { media } from "@/data/media";
import { withLang } from "@/lib/paths";
import { whatsappHref } from "@/lib/whatsapp";

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
  useBodyScrollLock(menuOpen);

  useEffect(() => {
    if (!menuOpen) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const inverted = !solid && !stuck && !menuOpen;
  const home = withLang("/", locale);

  const nav = [
    { href: withLang("/#o-nama", locale), label: ui.nav.about },
    { href: withLang("/#apartmani", locale), label: ui.nav.apartments },
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
            href={whatsappHref()}
            target="_blank"
            rel="noreferrer"
            className="hidden h-11 items-center gap-2 rounded-full bg-gold px-4 text-[0.72rem] font-semibold tracking-[0.1em] text-navy uppercase shadow-lg shadow-gold/20 transition hover:bg-gold-deep hover:text-white sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
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

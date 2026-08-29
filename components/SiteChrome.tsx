"use client";

import { Suspense, type ReactNode } from "react";
import { SiteProvider } from "@/components/providers/SiteProvider";
import { BookingModal } from "@/components/sections/BookingModal";
import { MobileContactBar } from "@/components/sections/MobileContactBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";

export function SiteChrome({
  children,
  solidHeader = false,
}: {
  children: ReactNode;
  solidHeader?: boolean;
}) {
  return (
    <Suspense fallback={null}>
      <SiteProvider>
        <div id="top" className="min-h-dvh bg-cream pb-20 md:pb-0">
          <SiteHeader solid={solidHeader} />
          {children}
          <SiteFooter />
          <MobileContactBar />
          <BookingModal />
        </div>
      </SiteProvider>
    </Suspense>
  );
}

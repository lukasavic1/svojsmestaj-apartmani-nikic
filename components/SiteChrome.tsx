"use client";

import { Suspense, type ReactNode } from "react";
import { SiteProvider } from "@/components/providers/SiteProvider";
import { BookingModal } from "@/components/sections/BookingModal";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { FloatingBookingButton } from "@/components/ui/FloatingBookingButton";

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
        <div id="top" className="min-h-dvh bg-cream">
          <SiteHeader solid={solidHeader} />
          {children}
          <SiteFooter />
          <FloatingBookingButton />
          <BookingModal />
        </div>
      </SiteProvider>
    </Suspense>
  );
}

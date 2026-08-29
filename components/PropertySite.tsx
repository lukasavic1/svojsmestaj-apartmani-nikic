"use client";

import { AboutSection } from "@/components/sections/AboutSection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { ApartmentsSection } from "@/components/sections/ApartmentsSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { FeatureBar } from "@/components/sections/FeatureBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { SiteChrome } from "@/components/SiteChrome";

export function PropertySite() {
  return (
    <SiteChrome>
      <main>
        <HeroSection />
        <FeatureBar />
        <AboutSection />
        <ApartmentsSection />
        <AmenitiesSection />
        <LocationSection />
        <ReviewsSection />
        <BookingSection />
      </main>
    </SiteChrome>
  );
}

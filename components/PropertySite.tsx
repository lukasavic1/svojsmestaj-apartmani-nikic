"use client";

import { AboutSection } from "@/components/sections/AboutSection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { ApartmentsSection } from "@/components/sections/ApartmentsSection";
import { ContactFaqSection } from "@/components/sections/ContactFaqSection";
import { FeatureBar } from "@/components/sections/FeatureBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { VideoShowcaseSection } from "@/components/sections/VideoShowcaseSection";
import { SiteChrome } from "@/components/SiteChrome";

export function PropertySite() {
  return (
    <SiteChrome>
      <main>
        <HeroSection />
        <FeatureBar />
        <AboutSection />
        <VideoShowcaseSection />
        <ApartmentsSection />
        <AmenitiesSection />
        <ReviewsSection />
        <LocationSection />
        <ContactFaqSection />
      </main>
    </SiteChrome>
  );
}

import { apartments } from "@/data/apartments";
import { site } from "@/data/site";
import { siteConfig } from "@/config/site";
import { media } from "@/data/media";
import { DEFAULT_LOCALE } from "@/types/locale";
import { tx } from "@/lib/i18n";

export function JsonLd() {
  const description = tx(site.seo.description, DEFAULT_LOCALE);

  const data = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: site.legalName,
    description,
    url: siteConfig.url,
    telephone: site.contact.phoneDisplay,
    image: apartments[0]?.photos[0]?.src ?? media.home[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.street,
      addressLocality: site.location.locality,
      addressRegion: site.location.city,
      postalCode: site.location.postalCode,
      addressCountry: site.location.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.lat,
      longitude: site.location.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.bookingScore,
      bestRating: 10,
      ratingCount: site.rating.count,
    },
    sameAs: [site.social.facebook, site.social.instagram, site.social.youtube],
    checkinTime: "15:00",
    checkoutTime: "10:00",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free parking" },
      { "@type": "LocationFeatureSpecification", name: "Sea view" },
      { "@type": "LocationFeatureSpecification", name: "WiFi" },
      { "@type": "LocationFeatureSpecification", name: "Air conditioning" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

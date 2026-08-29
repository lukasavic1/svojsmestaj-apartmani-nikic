import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/data/site";
import { siteConfig } from "@/config/site";
import { media } from "@/data/media";
import { DEFAULT_LOCALE } from "@/types/locale";
import { tx } from "@/lib/i18n";
import "./globals.css";

const heading = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

const title = tx(site.seo.title, DEFAULT_LOCALE);
const description = tx(site.seo.description, DEFAULT_LOCALE);

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [{ url: media.icon }],
    apple: [{ url: media.icon }],
  },
  openGraph: {
    type: "website",
    locale: "sr_Latn_ME",
    alternateLocale: ["en_US"],
    siteName: siteConfig.name,
    title,
    description,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: site.legalName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteConfig.defaultOgImage],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr-Latn" className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full bg-cream font-sans text-ink">{children}</body>
    </html>
  );
}

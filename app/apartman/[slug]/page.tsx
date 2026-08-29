import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { apartments, getApartmentBySlug } from "@/data/apartments";
import { site } from "@/data/site";
import { DEFAULT_LOCALE } from "@/types/locale";
import { tx } from "@/lib/i18n";
import { SiteChrome } from "@/components/SiteChrome";
import { ApartmentView } from "@/components/sections/ApartmentView";

type Params = { slug: string };

export function generateStaticParams() {
  return apartments.map((unit) => ({ slug: unit.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const apartment = getApartmentBySlug(slug);
  if (!apartment) return {};

  const name = tx(apartment.name, DEFAULT_LOCALE);
  const title = `${name} | ${site.name}`;
  const description = tx(apartment.hook, DEFAULT_LOCALE);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: apartment.photos[0]
        ? [{ url: apartment.photos[0].src, alt: name }]
        : undefined,
    },
  };
}

export default async function ApartmentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const apartment = getApartmentBySlug(slug);
  if (!apartment) notFound();

  return (
    <SiteChrome solidHeader>
      <main>
        <ApartmentView apartment={apartment} />
      </main>
    </SiteChrome>
  );
}

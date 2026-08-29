import { JsonLd } from "@/components/seo/JsonLd";
import { PropertySite } from "@/components/PropertySite";

export default function Home() {
  return (
    <>
      <JsonLd />
      <PropertySite />
    </>
  );
}

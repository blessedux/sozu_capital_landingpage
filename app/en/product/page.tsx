import type { Metadata } from "next";
import { ProductPage } from "@/components/landing-v2/ProductPage";
import { metadataEn } from "@/content/metadata-by-locale";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

export const metadata: Metadata = {
  ...metadataEn,
  title: "Product | SOZU CAPITAL",
  description:
    "Explore Sozu Tags, smart receipts, pay flows, core benefits, products, ramps, and financing—the full product detail.",
};

const locale: LandingLocale = "en";

export default function EnglishProductPage() {
  return <ProductPage locale={locale} copy={getLandingCopy(locale)} />;
}

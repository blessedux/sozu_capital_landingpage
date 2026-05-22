import type { Metadata } from "next";
import { PricingPage } from "@/components/landing-v2/PricingPage";
import { metadataEn } from "@/content/metadata-by-locale";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

export const metadata: Metadata = {
  ...metadataEn,
  title: "Pricing | SOZU CAPITAL",
  description:
    "Flexible capital plans to scale, save, and maximize value with Sozu.",
};

const locale: LandingLocale = "en";

export default function EnglishPricingPage() {
  return <PricingPage locale={locale} copy={getLandingCopy(locale)} />;
}

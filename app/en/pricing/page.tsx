import type { Metadata } from "next";
import { PricingPage } from "@/components/landing-v2/PricingPage";
import { metadataEn } from "@/content/metadata-by-locale";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

export const metadata: Metadata = {
  ...metadataEn,
  title: "Pricing | SOZU CAPITAL",
  description:
    "Free forever wallet. Pay 1% only on on-ramps and off-ramps. SozuPay for NGOs at $50/month.",
};

const locale: LandingLocale = "en";

export default function EnglishPricingPage() {
  return <PricingPage locale={locale} copy={getLandingCopy(locale)} />;
}

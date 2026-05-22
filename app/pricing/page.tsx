import type { Metadata } from "next";
import { PricingPage } from "@/components/landing-v2/PricingPage";
import { metadataEs } from "@/content/metadata-by-locale";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

export const metadata: Metadata = {
  ...metadataEs,
  title: "Precios | SOZU CAPITAL",
  description:
    "Planes flexibles de capital para escalar, ahorrar y maximizar valor con Sozu.",
};

const locale: LandingLocale = "es";

export default function PricingRoutePage() {
  return <PricingPage locale={locale} copy={getLandingCopy(locale)} />;
}

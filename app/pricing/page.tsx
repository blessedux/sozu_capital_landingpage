import type { Metadata } from "next";
import { PricingPage } from "@/components/landing-v2/PricingPage";
import { metadataEs } from "@/content/metadata-by-locale";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

export const metadata: Metadata = {
  ...metadataEs,
  title: "Precios | SOZU CAPITAL",
  description:
    "Billetera gratis para siempre. Pagá 1% solo en on-ramps y off-ramps. SozuPay para ONGs a $50/mes.",
};

const locale: LandingLocale = "es";

export default function PricingRoutePage() {
  return <PricingPage locale={locale} copy={getLandingCopy(locale)} />;
}

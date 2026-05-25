import type { Metadata } from "next";
import { CardPage } from "@/components/landing-v2/CardPage";
import { metadataEs } from "@/content/metadata-by-locale";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

export const metadata: Metadata = {
  ...metadataEs,
  title: "Card | SOZU CAPITAL",
  description:
    "HaLo Smart NFC Cards para Sozu—identidad de pago física, actualmente en desarrollo.",
};

const locale: LandingLocale = "es";

export default function CardRoutePage() {
  return <CardPage locale={locale} copy={getLandingCopy(locale)} />;
}

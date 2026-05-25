import type { Metadata } from "next";
import { CardPage } from "@/components/landing-v2/CardPage";
import { metadataEn } from "@/content/metadata-by-locale";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

export const metadata: Metadata = {
  ...metadataEn,
  title: "Card | SOZU CAPITAL",
  description:
    "HaLo Smart NFC Cards for Sozu—physical payment identity, currently under development.",
};

const locale: LandingLocale = "en";

export default function EnglishCardPage() {
  return <CardPage locale={locale} copy={getLandingCopy(locale)} />;
}

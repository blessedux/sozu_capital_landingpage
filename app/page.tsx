import type { Metadata } from "next";
import { LandingV2 } from "@/components/landing-v2/LandingV2";
import { metadataEn } from "@/content/metadata-by-locale";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

export const metadata: Metadata = metadataEn;

const locale: LandingLocale = "en";

export default function HomePage() {
  return <LandingV2 locale={locale} copy={getLandingCopy(locale)} />;
}

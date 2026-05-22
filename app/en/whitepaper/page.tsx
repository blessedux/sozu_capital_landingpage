import type { Metadata } from "next";
import { WhitepaperPage } from "@/components/landing-v2/WhitepaperPage";
import { metadataEn } from "@/content/metadata-by-locale";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

export const metadata: Metadata = {
  ...metadataEn,
  title: "Whitepaper | SOZU CAPITAL",
  description:
    "Why Sozu exists—sovereignty, access, transparency, and global non-custodial infrastructure for teams operating from Latin America and beyond.",
};

const locale: LandingLocale = "en";

export default function EnglishWhitepaperRoutePage() {
  return <WhitepaperPage locale={locale} copy={getLandingCopy(locale)} />;
}

import type { Metadata } from "next";
import { RoadmapPage } from "@/components/landing-v2/RoadmapPage";
import { metadataEn } from "@/content/metadata-by-locale";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

export const metadata: Metadata = {
  ...metadataEn,
  title: "Ramp roadmap | SOZU CAPITAL",
  description:
    "What's shipped, what's being built, and what's coming in 2026—on-ramps, off-ramps, and local rails on Sozu.",
};

const locale: LandingLocale = "en";

export default function EnglishRoadmapPage() {
  return <RoadmapPage locale={locale} copy={getLandingCopy(locale)} />;
}

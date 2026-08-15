import type { Metadata } from "next";
import { RoadmapPage } from "@/components/landing-v2/RoadmapPage";
import { metadataEs } from "@/content/metadata-by-locale";
import { getLandingCopy, type LandingLocale } from "@/lib/landing-copy";

export const metadata: Metadata = {
  ...metadataEs,
  title: "Roadmap de rampas | SOZU CAPITAL",
  description:
    "Qué ya shippeamos, qué estamos construyendo y qué llega en 2026—on-ramps, off-ramps y rieles locales en Sozu.",
};

const locale: LandingLocale = "es";

export default function RoadmapRoutePage() {
  return <RoadmapPage locale={locale} copy={getLandingCopy(locale)} />;
}

"use client";

import { useState } from "react";
import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import { SiteHeader } from "./SiteHeader";
import { HeroSection } from "./HeroSection";
import { PartnersSection } from "./PartnersSection";
import { PathwaysSection } from "./PathwaysSection";
import { VoiceDemoTeaser } from "@/components/voice-demo/VoiceDemoTeaser";
import { ProblemSection } from "./ProblemSection";
import { SolutionSection } from "./SolutionSection";
import { SozuTagsSection } from "./SozuTagsSection";
import { PricingSection } from "./PricingSection";
import { NetworkLayerSection } from "./NetworkLayerSection";
import { InfrastructureSection } from "./InfrastructureSection";
import { StrategicFinanceSection } from "./StrategicFinanceSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { FooterSection } from "./FooterSection";

export type LandingV2Props = {
  locale: LandingLocale;
  copy: LandingCopy;
};

export function LandingV2({ locale, copy }: LandingV2Props) {
  const basePath = locale === "en" ? "/en" : "";
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);

  return (
    <div className="landing-v2-grain min-h-screen bg-background text-foreground">
      <SiteHeader
        copy={copy}
        basePath={basePath}
        heroScrollProgress={heroScrollProgress}
      />
      <main className="relative z-[2] [&>section:nth-child(even)]:bg-surface/40">
        <HeroSection
          copy={copy.hero}
          basePath={basePath}
          onHeroScrollProgress={setHeroScrollProgress}
        />
        <PartnersSection copy={copy.partners} />
        <PathwaysSection copy={copy.pathways} basePath={basePath} />
        {/* Parallax curtain: Problem stays pinned while Solution slides up to cover it */}
        <div className="relative">
          <ProblemSection copy={copy.problem} />
          <SolutionSection copy={copy.solution} />
        </div>
        <VoiceDemoTeaser
          copy={copy.voiceDemoTeaser}
          locale={locale}
          basePath={basePath}
        />
        <NetworkLayerSection copy={copy.networkLayer} />
        <SozuTagsSection copy={copy} basePath={basePath} locale={locale} />
        <PricingSection copy={copy.pricing} basePath={basePath} />
        <InfrastructureSection copy={copy.infrastructure} />
        <StrategicFinanceSection copy={copy.strategicFinance} />
        <FinalCtaSection copy={copy.finalCta} basePath={basePath} />
      </main>
      <FooterSection copy={copy.footer} basePath={basePath} />
    </div>
  );
}

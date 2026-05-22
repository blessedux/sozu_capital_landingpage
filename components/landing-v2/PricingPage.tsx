"use client";

import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import { SiteHeader } from "./SiteHeader";
import { PricingSection } from "./PricingSection";
import { FooterSection } from "./FooterSection";

export type PricingPageProps = {
  locale: LandingLocale;
  copy: LandingCopy;
};

export function PricingPage({ locale, copy }: PricingPageProps) {
  const basePath = locale === "en" ? "/en" : "";

  return (
    <div className="landing-v2-grain min-h-screen bg-[#0a0a0a] text-white">
      <SiteHeader copy={copy} basePath={basePath} />
      <main className="relative z-[2] pt-20">
        <PricingSection copy={copy.pricing} basePath={basePath} />
      </main>
      <FooterSection copy={copy.footer} basePath={basePath} />
    </div>
  );
}

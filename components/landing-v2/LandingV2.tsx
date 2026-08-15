"use client";

import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import { SiteHeader } from "./SiteHeader";
import { HeroSection } from "./HeroSection";
import { HeroActionPanel } from "./HeroActionPanel";
import { CashOutSection } from "./CashOutSection";
import { SozuTagsSection } from "./SozuTagsSection";
import { FooterSection } from "./FooterSection";

export type LandingV2Props = {
  locale: LandingLocale;
  copy: LandingCopy;
};

/**
 * Stacking (siblings inside .landing-v2-grain isolation):
 * - Header fixed z-5 (below Tags) / z-200 when elevated on scroll-up
 * - Hero sticky z-0
 * - Action panel sticky z-15 (above Tags while scrolling past hero)
 * - Tags + Cash are static document flow (no Tags↔Cash parallax)
 * - Footer z-30 (above sticky CTA so it paints on top at the seam)
 *
 * Do not put z-index on <main> — it would trap Tags below the fixed header.
 */
export function LandingV2({ locale, copy }: LandingV2Props) {
  const basePath = locale === "en" ? "/en" : "";

  return (
    <div className="landing-v2-grain min-h-screen bg-background text-foreground">
      <SiteHeader copy={copy} basePath={basePath} />
      <main>
        <div className="relative">
          <div className="pointer-events-none sticky top-0 z-[15] h-0 overflow-visible">
            <div className="flex h-[100svh] w-full flex-col justify-end px-6 pb-6 md:px-12 md:pb-8 lg:px-16">
              <div className="mb-12 grid w-full grid-cols-1 items-start gap-8 md:mb-16 md:grid-cols-2 md:gap-12 lg:gap-16">
                <div className="hidden md:block" aria-hidden />
                <HeroActionPanel
                  copy={copy.hero}
                  basePath={basePath}
                  className="pointer-events-auto justify-self-end drop-shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                />
              </div>
              <div
                className="invisible flex flex-col gap-4 border-t border-transparent pt-5 md:flex-row md:items-center md:gap-8"
                aria-hidden
              >
                <p className="shrink-0 text-xs font-medium tracking-[0.04em] md:text-sm">
                  {copy.partners.heading}
                </p>
                <div className="h-7 md:h-8" />
              </div>
            </div>
          </div>

          <HeroSection copy={copy.hero} partners={copy.partners} />

          <div className="relative z-10 dark">
            <SozuTagsSection
              copy={copy}
              basePath={basePath}
              locale={locale}
            />
            <CashOutSection copy={copy.cashOut} basePath={basePath} />
          </div>
        </div>
      </main>
      <div className="relative z-30 dark">
        <FooterSection
          copy={copy.footer}
          basePath={basePath}
          lang={copy.lang}
        />
      </div>
    </div>
  );
}

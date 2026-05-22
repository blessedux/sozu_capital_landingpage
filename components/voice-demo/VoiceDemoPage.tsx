"use client";

import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import { SiteHeader } from "@/components/landing-v2/SiteHeader";
import { FooterSection } from "@/components/landing-v2/FooterSection";
import { GradientBackground } from "@/components/ui/paper-design-shader-background";
import { VoiceDemoExperience } from "./VoiceDemoExperience";

type Props = {
  locale: LandingLocale;
  copy: LandingCopy;
};

export function VoiceDemoPage({ locale, copy }: Props) {
  const basePath = locale === "en" ? "/en" : "";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-foreground">
      <GradientBackground />
      {/* Dark veil so the shader reads as a subtle glow rather than a harsh gradient */}
      <div className="absolute inset-0 -z-[9] bg-[#0a0a0a]/70" aria-hidden />
      <SiteHeader copy={copy} basePath={basePath} />
      <main className="relative z-[2] px-6 pb-24 pt-28 md:px-12 xl:px-20">
        <VoiceDemoExperience
          copy={copy.voiceDemo}
          locale={locale}
          basePath={basePath}
        />
      </main>
      <FooterSection copy={copy.footer} basePath={basePath} />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { LandingCopy } from "@/lib/landing-copy";
import { OrbitalHeroSection } from "@/components/ui/orbital-hero-section";

type Props = {
  copy: LandingCopy["cashOut"];
  basePath: string;
};

/** Same dark blue as Tags (`bg-background` under `.dark`). */
const TAGS_BG = "#0b1218";

function useNarrow(query = "(max-width: 767px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [query]);
  return narrow;
}

/** Cash section — current copy over the interactive orbital solar-system background. */
export function CashOutSection({ copy, basePath }: Props) {
  const narrow = useNarrow();

  return (
    <section
      id="cash-out"
      className="relative scroll-mt-24 border-b border-border bg-background dark"
    >
      <div className="relative min-h-[min(92svh,56rem)] w-full md:min-h-[40rem]">
        <OrbitalHeroSection
          className="absolute inset-0 min-h-[min(92svh,56rem)] md:min-h-[40rem]"
          backgroundColor={TAGS_BG}
          focus={narrow ? [0.5, 0.82] : [0.72, 0.45]}
          scrim={narrow ? "top" : "left"}
          scrimStrength={narrow ? 0.94 : 0.9}
          viewRadius={narrow ? 2.1 : 3.0}
          lead={narrow ? 0.05 : 0.1}
          glow={narrow ? 0.55 : 1}
          interactive
        >
          <div className="flex h-full min-h-[min(92svh,56rem)] items-start px-5 pt-16 sm:px-10 md:min-h-[40rem] md:items-center md:px-12 md:pt-0 xl:px-20">
            <div className="mx-auto w-full max-w-[75rem]">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground md:text-[48px] md:leading-[1.1]">
                  {copy.title}
                </h2>
                <p className="mt-4 max-w-xl text-lg font-medium leading-8 text-white md:text-xl md:leading-8">
                  {copy.subtitle}
                </p>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
                  {copy.description}
                </p>

                <div className="mt-10 mb-16 max-w-xl space-y-6 leading-relaxed text-muted md:mb-24">
                  <p>{copy.p1}</p>
                  <p>{copy.p2}</p>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted/60">
                    {copy.disclaimer}
                  </p>
                  <Link
                    href={`${basePath}/onboarding`}
                    className="inline-flex rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
                  >
                    {copy.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </OrbitalHeroSection>
      </div>
    </section>
  );
}

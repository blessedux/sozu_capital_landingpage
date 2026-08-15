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
  // Default true so mobile never mounts the orbital scene before hydration.
  const [narrow, setNarrow] = useState(true);
  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [query]);
  return narrow;
}

function CashOutCopy({
  copy,
  basePath,
}: {
  copy: LandingCopy["cashOut"];
  basePath: string;
}) {
  return (
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
  );
}

/** Cash section — orbital solar system on desktop; solid bg on mobile for now. */
export function CashOutSection({ copy, basePath }: Props) {
  const narrow = useNarrow();

  return (
    <section
      id="cash-out"
      className="relative scroll-mt-24 border-b border-border bg-background dark"
    >
      <div className="relative min-h-[min(92svh,56rem)] w-full md:min-h-[40rem]">
        {narrow ? (
          <div
            className="absolute inset-0 min-h-[min(92svh,56rem)]"
            style={{ backgroundColor: TAGS_BG }}
          >
            <CashOutCopy copy={copy} basePath={basePath} />
          </div>
        ) : (
          <OrbitalHeroSection
            className="absolute inset-0 min-h-[min(92svh,56rem)] md:min-h-[40rem]"
            backgroundColor={TAGS_BG}
            focus={[0.72, 0.45]}
            scrim="left"
            scrimStrength={0.9}
            viewRadius={3.0}
            lead={0.1}
            glow={1}
            interactive
          >
            <CashOutCopy copy={copy} basePath={basePath} />
          </OrbitalHeroSection>
        )}
      </div>
    </section>
  );
}

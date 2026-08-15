"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { LandingCopy } from "@/lib/landing-copy";
import { cn } from "@/lib/utils";
import { signalLandingReady } from "@/lib/landing-ready";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";
import {
  PARTNER_LOGOS,
  partnerLogoScale,
} from "./partner-logos";

type HeroSectionProps = {
  copy: LandingCopy["hero"];
  partners: LandingCopy["partners"];
  basePath?: string;
  onIntroComplete?: () => void;
};

/** Title + partners; mobile CTA inline below h1. Desktop CTA in HeroActionPanel. */
export function HeroSection({
  copy,
  partners,
  basePath = "",
  onIntroComplete,
}: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const introDone = useRef(false);

  const { scrollY } = useScroll();
  const opacity = useTransform(
    scrollY,
    [0, 420, 900],
    reduceMotion ? [1, 1, 1] : [1, 0.82, 0.4]
  );
  const y = useTransform(
    scrollY,
    [0, 900],
    reduceMotion ? [0, 0] : [0, 56]
  );

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      if (introDone.current) return;
      introDone.current = true;
      signalLandingReady();
      onIntroComplete?.();
    }, 2500);
    return () => window.clearTimeout(fallback);
  }, [onIntroComplete]);

  const handleVideoReady = () => {
    if (introDone.current) return;
    introDone.current = true;
    signalLandingReady();
    onIntroComplete?.();
  };

  return (
    <section
      id="hero"
      className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden bg-[var(--antiquity-charcoal)]"
    >
      <motion.div
        style={{ opacity, y }}
        className="absolute inset-0 will-change-transform"
      >
        <HeroBackgroundVideo onReady={handleVideoReady} />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[rgba(11,18,24,0.85)] via-[rgba(11,18,24,0.25)] to-transparent"
        />
      </motion.div>

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+2.5rem+10svh))] pt-24 md:px-12 md:pb-8 lg:px-16">
        <div className="mb-8 grid w-full grid-cols-1 items-start gap-8 md:mb-16 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="flex flex-col">
            <h1 className="font-display max-w-[14ch] whitespace-pre-line text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-[#f5fbfc] sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
              {copy.title}
            </h1>
            {/* Mobile-only inline CTA — no sticky overlay on small screens */}
            <Link
              href={`${basePath}/onboarding`}
              className="mt-8 mb-6 ml-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#0b1218] shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-transform hover:scale-[1.02] md:hidden"
            >
              {copy.ctaPrimary}
              <span aria-hidden className="text-lg leading-none">
                →
              </span>
            </Link>
          </div>
          {/* Right column reserved for sticky HeroActionPanel (desktop) */}
          <div className="hidden md:block" aria-hidden />
        </div>

        <div
          className="flex flex-col gap-4 border-t border-white/20 pt-5 md:flex-row md:items-center md:gap-8"
          aria-label={partners.ariaLabel}
        >
          <p className="shrink-0 text-xs font-medium tracking-[0.04em] text-white/55 md:text-sm">
            {partners.heading}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8">
            {PARTNER_LOGOS.map((logo) => {
              const half = partnerLogoScale(logo) < 1;
              return (
                <li
                  key={logo.src}
                  className={cn(
                    "flex items-center",
                    half ? "h-3.5 md:h-4" : "h-7 md:h-8"
                  )}
                >
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-full transition-opacity hover:opacity-100"
                    aria-label={logo.alt}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className={
                        half
                          ? "h-full w-auto max-w-[3.75rem] object-contain opacity-70 brightness-0 invert"
                          : "h-full w-auto max-w-[7.5rem] object-contain opacity-70 brightness-0 invert"
                      }
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

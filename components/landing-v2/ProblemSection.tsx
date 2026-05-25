"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import type { LandingCopy } from "@/lib/landing-copy";
import { VoicePoweredOrb } from "@/components/ui/voice-powered-orb";

type Props = {
  copy: LandingCopy["problem"];
  basePath: string;
};

const ORANGE_GLOW =
  "radial-gradient(circle, rgba(255,128,0,0.05) 0%, rgba(255,128,0,0) 70%)";

const LEFT_Y = { start: 36, end: -100 };
const BG_Y = { start: 0, end: 70 };
const CLOSING_Y = { start: 24, end: -80 };

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function sectionScrollProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const viewport = window.innerHeight;
  const span = viewport + rect.height;
  if (span <= 0) return 0;
  return Math.min(1, Math.max(0, (viewport - rect.top) / span));
}

export function ProblemSection({ copy, basePath }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const glowLayerRef = useRef<HTMLDivElement>(null);
  const leftBlockRef = useRef<HTMLDivElement>(null);
  const orbBlockRef = useRef<HTMLDivElement>(null);
  const closingBlockRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let raf = 0;
    let active = true;
    let reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => {
      reducedMotion = mq.matches;
    };
    mq.addEventListener("change", onMq);

    const applyParallax = () => {
      const section = sectionRef.current;
      const bg = bgLayerRef.current;
      const glow = glowLayerRef.current;
      const left = leftBlockRef.current;
      const orb = orbBlockRef.current;
      const closing = closingBlockRef.current;

      if (!section || !bg || !left || !orb || !closing || reducedMotion) return;

      const t = sectionScrollProgress(section);
      const bgOffset = lerp(BG_Y.start, BG_Y.end, t);
      const leftOffset = lerp(LEFT_Y.start, LEFT_Y.end, t);
      const closingOffset = lerp(CLOSING_Y.start, CLOSING_Y.end, t);

      bg.style.transform = `translate3d(0, ${bgOffset}px, 0)`;
      if (glow) {
        glow.style.transform = `translate3d(-50%, ${bgOffset}px, 0)`;
      }
      left.style.transform = `translate3d(0, ${leftOffset}px, 0)`;
      orb.style.transform = `translate3d(0, ${leftOffset}px, 0)`;
      closing.style.transform = `translate3d(0, ${closingOffset}px, 0)`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (active) applyParallax();
      });
    };

    applyParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      active = false;
      if (raf) cancelAnimationFrame(raf);
      mq.removeEventListener("change", onMq);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      aria-label={copy.ariaLabel}
      className="sticky top-0 min-h-[720px] overflow-hidden !bg-[#0a0a0a] lg:min-h-[880px]"
    >
      <div
        ref={bgLayerRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden will-change-transform"
      >
        <div className="absolute inset-x-0 -top-[12%] h-[124%]">
          <Image
            src="/figma/problem/problem_bg.webp"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] from-0% via-transparent via-[39%] to-transparent" />
        </div>
      </div>

      <div
        ref={glowLayerRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-200px] z-[1] h-[600px] w-full max-w-[1000px] opacity-50 will-change-transform"
        style={{ transform: "translate3d(-50%, 0, 0)" }}
      >
        <div
          className="h-full w-full"
          style={{ backgroundImage: ORANGE_GLOW }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[75rem] flex-col justify-between gap-16 px-6 py-24 md:px-12 lg:min-h-[880px] lg:py-32 xl:px-20">
        <div
          ref={orbBlockRef}
          aria-hidden
          className="pointer-events-none absolute right-6 top-24 z-[1] hidden h-80 w-80 will-change-transform md:right-12 lg:block xl:right-20 xl:top-32 xl:h-[28rem] xl:w-[28rem]"
        >
          <VoicePoweredOrb className="h-full w-full" tone="orange" />
        </div>

        <div
          ref={leftBlockRef}
          className="relative z-10 flex max-w-[34rem] flex-col will-change-transform"
        >
          <h2 className="font-display text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-white md:text-[40px] md:leading-[1.12]">
            {copy.title}
          </h2>

          <p className="mt-5 max-w-[30rem] text-lg leading-8 text-white/70 md:text-xl md:leading-[30px]">
            {copy.subheading}
          </p>

          <ul className="mt-8 list-none space-y-3 pl-0">
            {copy.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex gap-3 text-[17px] leading-7 text-white/90 md:text-[18px]"
              >
                <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-[#ff8000]" aria-hidden />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <Link
            href={`${basePath}/onboarding?product=sozupay`}
            className="mt-10 inline-flex w-fit rounded-full bg-[#ff8000] px-8 py-3.5 text-sm font-bold text-black shadow-[0_0_10px_rgba(255,128,0,0.3)] transition-colors hover:bg-[#ff8000]/90"
          >
            {copy.cta}
          </Link>
        </div>

        <div
          ref={closingBlockRef}
          className="relative z-10 mb-20 max-w-[36rem] will-change-transform self-end text-left md:mb-28 lg:mb-32 lg:text-right"
        >
          <p className="font-display text-[22px] font-semibold leading-8 text-white md:text-[26px] md:leading-9">
            {copy.closingLine}
          </p>
        </div>
      </div>
    </section>
  );
}

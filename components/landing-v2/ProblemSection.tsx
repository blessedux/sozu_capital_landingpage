"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import type { LandingCopy } from "@/lib/landing-copy";

type Props = { copy: LandingCopy["problem"] };

const ORANGE_GLOW =
  "radial-gradient(circle, rgba(255,128,0,0.05) 0%, rgba(255,128,0,0) 70%)";

const HOOK_LINE_CLASS =
  "max-w-[30rem] text-[24px] font-medium leading-[32px] text-white";
const TITLE_LINE_CLASS =
  "max-w-[30rem] text-[20px] font-normal leading-[26px] text-white";

const TITLE_Y = { start: 36, end: -100 };
const BG_Y = { start: 0, end: 70 };
const TAGLINE_Y = { start: 24, end: -80 };

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

export function ProblemSection({ copy }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const glowLayerRef = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const taglineBlockRef = useRef<HTMLDivElement>(null);
  const titleLines = [copy.line1, copy.line2];

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
      const titles = titleBlockRef.current;
      const taglines = taglineBlockRef.current;

      if (!section || !bg || !titles || !taglines || reducedMotion) return;

      const t = sectionScrollProgress(section);
      const bgOffset = lerp(BG_Y.start, BG_Y.end, t);
      const titleOffset = lerp(TITLE_Y.start, TITLE_Y.end, t);
      const taglineOffset = lerp(TAGLINE_Y.start, TAGLINE_Y.end, t);

      bg.style.transform = `translate3d(0, ${bgOffset}px, 0)`;
      if (glow) {
        glow.style.transform = `translate3d(-50%, ${bgOffset}px, 0)`;
      }
      titles.style.transform = `translate3d(0, ${titleOffset}px, 0)`;
      taglines.style.transform = `translate3d(0, ${taglineOffset}px, 0)`;
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
          ref={titleBlockRef}
          className="flex max-w-[32rem] flex-col gap-0 will-change-transform"
        >
          {titleLines.map((line, index) => (
            <p
              key={line}
              className={index === 0 ? HOOK_LINE_CLASS : TITLE_LINE_CLASS}
            >
              {line}
            </p>
          ))}

          <ul className="mt-6 list-none space-y-2 pl-0">
            {copy.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex gap-3 text-[18px] leading-7 text-white"
              >
                <span className="shrink-0 text-[#ff8000]" aria-hidden>
                  •
                </span>
                <span className="capitalize">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={taglineBlockRef}
          className="mb-10 max-w-[39rem] will-change-transform self-end text-left md:mb-14 lg:mb-16 lg:text-right"
        >
          <p className="text-[20px] leading-8 text-white">{copy.taglineSimple}</p>
          <p className="mt-4 text-[20px] font-medium leading-8 text-white">
            {copy.taglinePowerful}
          </p>
        </div>
      </div>
    </section>
  );
}

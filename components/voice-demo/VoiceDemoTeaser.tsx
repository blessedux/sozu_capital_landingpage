"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  runIntent,
  type DemoIntentId,
} from "@/lib/finance-engine/intents";
import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import {
  getLineReveal,
  getScrollRunwayHeightVh,
  getSectionScrollProgressFromRect,
} from "@/lib/voice-demo-scroll";
import { cn } from "@/lib/utils";
import {
  ScrollDrivenMessage,
  type ScrollMessageLine,
} from "./ScrollDrivenMessage";
import {
  GradientBackground,
  GradientOrb,
} from "@/components/ui/paper-design-shader-background";

type Props = {
  copy: LandingCopy["voiceDemoTeaser"];
  locale: LandingLocale;
  basePath: string;
};

const STICKY_TOP = "top-[72px] md:top-20";
const STICKY_HEIGHT = "h-[calc(100dvh-72px)] md:h-[calc(100dvh-5rem)]";

function useStickyTopPx() {
  const [px, setPx] = useState(72);
  useEffect(() => {
    const update = () => {
      setPx(window.matchMedia("(min-width: 768px)").matches ? 80 : 72);
    };
    update();
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return px;
}

export function VoiceDemoTeaser({ copy, locale, basePath }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyTopPx = useStickyTopPx();
  const [rawProgress, setRawProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [copyRevealed, setCopyRevealed] = useState(false);
  const copyRevealRef = useRef<HTMLDivElement>(null);
  const messagesScrollRef = useRef<HTMLDivElement>(null);

  const allLines = useMemo((): ScrollMessageLine[] => {
    const lines: ScrollMessageLine[] = [];
    copy.turns.forEach((turn, i) => {
      const result = runIntent(turn.intentId as DemoIntentId, locale);
      const turnId = `turn-${i}`;
      lines.push({
        id: `${turnId}-u`,
        role: "user",
        text: turn.userText ?? result.userText,
      });
      lines.push({
        id: `${turnId}-a`,
        role: "assistant",
        text: result.assistantText,
        action: result.assistantAction,
      });
    });
    return lines;
  }, [copy.turns, locale]);

  const lineCount = allLines.length;
  const runwayVh = getScrollRunwayHeightVh(lineCount);

  const lineReveals = useMemo(() => {
    if (reducedMotion && rawProgress > 0.05) {
      return allLines.map((_, i) =>
        rawProgress >= (i + 1) / lineCount ? 1 : 0
      );
    }
    return allLines.map((_, i) => getLineReveal(rawProgress, i, lineCount));
  }, [allLines, lineCount, rawProgress, reducedMotion]);

  const isEmpty = rawProgress < 0.008;

  const syncProgress = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    setRawProgress(getSectionScrollProgressFromRect(section, stickyTopPx));
  }, [stickyTopPx]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = copyRevealRef.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setCopyRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCopyRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let loopId = 0;
    const tick = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) syncProgress();
      }
      loopId = requestAnimationFrame(tick);
    };

    syncProgress();
    loopId = requestAnimationFrame(tick);

    const ro = new ResizeObserver(syncProgress);
    ro.observe(section);

    window.addEventListener("scroll", syncProgress, { passive: true });
    window.addEventListener("resize", syncProgress);
    return () => {
      cancelAnimationFrame(loopId);
      ro.disconnect();
      window.removeEventListener("scroll", syncProgress);
      window.removeEventListener("resize", syncProgress);
    };
  }, [syncProgress]);

  useEffect(() => {
    const el = messagesScrollRef.current;
    if (!el || isEmpty) return;

    const overflow = el.scrollHeight - el.clientHeight;
    el.scrollTop = overflow > 0 ? overflow : 0;
  }, [isEmpty, lineReveals, rawProgress]);

  return (
    <section
      ref={sectionRef}
      id="voice-demo"
      aria-label={copy.ariaLabel}
      className="relative scroll-mt-20 border-y border-white/5 bg-[#0a0a0a] [overflow:clip]"
    >
      <div
        className={cn(
          "relative sticky z-[1] flex items-center py-10 md:py-14",
          STICKY_TOP,
          STICKY_HEIGHT
        )}
      >
        {/*
          Left-side ambient orb — decorative only.
          Sits at z-0 (below content at z-10+), clipped to the left half by its
          absolute positioning. overflow-hidden on the sticky div keeps it contained.
        */}
        <GradientOrb className="left-[-6%] top-1/2 z-0 h-[min(640px,80vh)] w-[min(640px,80vh)] -translate-y-1/2 opacity-40" />

        <div className="relative z-10 mx-auto w-full max-w-[75rem] px-6 md:px-12 xl:px-20">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-md shrink-0 text-center lg:max-w-lg lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff8000]">
                {copy.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                {copy.title}
              </h2>
              <div ref={copyRevealRef}>
                <p
                  className={cn(
                    "mt-4 text-lg leading-relaxed text-white/65 transition-all duration-700 ease-out",
                    copyRevealed || reducedMotion
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  )}
                >
                  {copy.subtitle}
                </p>
              </div>
              <div className="mt-6 space-y-2 border-t border-white/10 pt-6">
                <p className="text-base leading-relaxed text-white/80">
                  {copy.taglineSimple}
                </p>
                <p className="text-base font-medium leading-relaxed text-white">
                  {copy.taglinePowerful}
                </p>
              </div>
              <div
                className={cn(
                  "mt-6 flex flex-wrap items-center gap-3 transition-all duration-700 ease-out",
                  copyRevealed || reducedMotion
                    ? "translate-y-0 opacity-100 delay-150"
                    : "translate-y-4 opacity-0"
                )}
              >
                <Link
                  href={`${basePath}/onboarding`}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#ff8000]/50 hover:bg-[#ff8000]/10"
                >
                  {copy.cta}
                </Link>

                <div className="flex items-center gap-2">
                  {/* Telegram */}
                  <span
                    aria-hidden
                    className="flex size-[38px] items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70"
                  >
                    <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
                    </svg>
                  </span>

                  {/* WhatsApp */}
                  <span
                    aria-hidden
                    className="flex size-[38px] items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70"
                  >
                    <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  </span>

                  {/* ElizaOS */}
                  <span className="text-[11px] font-medium text-white/40">
                    powered by ElizaOS
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[min(100%,340px)] shrink-0">
              <div
                className={cn(
                  "relative flex h-[min(380px,calc(100dvh-11rem))] min-h-[300px] flex-col overflow-hidden rounded-[2rem]",
                  "shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
                )}
              >
                <GradientBackground />
                {/* Dark veil over the shader so the chat content stays legible */}
                <div className="absolute inset-0 -z-[9] bg-[#0a0a0a]/75" aria-hidden />

                {/* Sozu logo — centered and full opacity when idle, fades to a dim blurred watermark once conversation starts */}
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 z-0 flex items-center justify-center transition-all duration-700 ease-out",
                    isEmpty ? "opacity-100 blur-none" : "opacity-[0.07] blur-[2px]"
                  )}
                >
                  <Image
                    src="/sozucapital_logo_tb.png"
                    alt=""
                    width={108}
                    height={44}
                    className="object-contain"
                    priority={false}
                  />
                </div>

                <div
                  className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pt-5 pb-4"
                  aria-live="polite"
                >
                  <div
                    ref={messagesScrollRef}
                    className="flex min-h-0 flex-1 flex-col justify-start gap-2 overflow-x-hidden overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {!isEmpty
                      ? allLines.map((line, i) => (
                          <ScrollDrivenMessage
                            key={line.id}
                            line={line}
                            reveal={lineReveals[i] ?? 0}
                          />
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none w-full"
        style={{ height: `${runwayVh}vh` }}
      />
    </section>
  );
}

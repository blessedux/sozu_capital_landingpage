"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { LandingCopy } from "@/lib/landing-copy";
import { cn } from "@/lib/utils";

const SPLINE_SCENE_URL =
  "https://prod.spline.design/qJMdOHKop06FuXNN/scene.splinecode";
const SPLINE_VIEWER_SCRIPT =
  "https://unpkg.com/@splinetool/viewer@1.10.74/build/spline-viewer.js";
const SCROLL_TRACK_VH = 1;
/** Scroll progress range where hero copy fades in over the Spline scene */
const CONTENT_FADE_START = 0.05;
const CONTENT_FADE_END = 0.85;
const WHEEL_SCROLL_SPEED = 0.0012;
const TOUCH_SCROLL_SPEED = 0.0015;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": {
        url: string;
        style?: React.CSSProperties;
        onLoad?: () => void;
      };
    }
  }
}

function setSplineScrollProgress(app: unknown, progress: number) {
  const splineApp = app as {
    setVariable?: (name: string, value: number) => void;
  };
  if (typeof splineApp?.setVariable !== "function") return;

  const value = progress * 100;
  for (const name of ["Scroll", "scroll", "Progress", "progress"]) {
    try {
      splineApp.setVariable(name, value);
    } catch {
      /* optional */
    }
  }
}

function getScrollableDistance(track: HTMLElement): number {
  return Math.max(0, track.offsetHeight - window.innerHeight);
}

/** Progress 0→1 through the hero scroll track (sticky Spline stage). */
function getScrollProgress(track: HTMLElement): number {
  const scrollable = getScrollableDistance(track);
  if (scrollable <= 0) return 0;

  const scrolled = -track.getBoundingClientRect().top;
  return Math.min(1, Math.max(0, scrolled / scrollable));
}

function isHeroTrackInView(track: HTMLElement): boolean {
  const rect = track.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

/** 0 → 1 as right-column charts/dashboard fade in on scroll */
function chartsRevealProgress(scrollProgress: number): number {
  if (scrollProgress <= CONTENT_FADE_START) return 0;
  if (scrollProgress >= CONTENT_FADE_END) return 1;
  return (
    (scrollProgress - CONTENT_FADE_START) /
    (CONTENT_FADE_END - CONTENT_FADE_START)
  );
}

/** 0 → 1 as hero left-column content and navbar chrome fade in once scrolling starts */
function heroContentReveal(scrollProgress: number): number {
  if (scrollProgress <= 0.03) return 0;
  if (scrollProgress >= 0.22) return 1;
  return (scrollProgress - 0.03) / 0.19;
}

type HeroSectionProps = {
  copy: LandingCopy["hero"];
  basePath: string;
  onHeroScrollProgress?: (progress: number) => void;
};

function HeroContentOverlay({
  copy,
  basePath,
  chartsReveal,
  contentReveal,
  visible,
}: {
  copy: LandingCopy["hero"];
  basePath: string;
  chartsReveal: number;
  contentReveal: number;
  visible: boolean;
}) {
  const p = (href: string) => `${basePath}${href}`;
  const chartsTranslateY = (1 - chartsReveal) * 40;
  const contentTranslateY = (1 - contentReveal) * 24;

  return (
    <div
      className="flex h-full min-h-0 w-full flex-col overflow-x-hidden overflow-y-auto"
      style={{
        visibility: visible ? "visible" : "hidden",
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-hidden={!visible}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45"
        aria-hidden
        style={{ opacity: Math.max(0.35, chartsReveal * 0.75) }}
      />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-5 pb-16 pt-[4.5rem] md:px-12 md:pb-20 md:pt-24 lg:px-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div
            className="relative z-10 flex flex-col gap-7 md:gap-8"
            style={{
              opacity: contentReveal,
              transform: `translate3d(0, ${contentTranslateY}px, 0)`,
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="size-2 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  {copy.betaBadge}
                </span>
              </div>
              <h1 className="font-display max-w-[596px] whitespace-pre-line text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-[4.5rem] lg:leading-[76px]">
                {copy.title}
              </h1>
              <p className="max-w-[500px] text-lg leading-8 text-white/75 md:text-xl">
                {copy.body}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-5">
              <Link
                href={p("/onboarding")}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#ff8000] to-[#df774f] px-8 py-4 text-lg font-bold text-black shadow-[0_4px_15px_rgba(255,128,0,0.4)] sm:px-10"
              >
                {copy.ctaPrimary}
              </Link>
            </div>
          </div>

          <div
            className={cn(
              "relative z-0 transition-[min-height] duration-300",
              chartsReveal > 0.01
                ? "min-h-[360px] sm:min-h-[420px] lg:min-h-[520px]"
                : "min-h-0 overflow-hidden lg:min-h-0"
            )}
            style={{
              opacity: chartsReveal,
              visibility: chartsReveal > 0.01 ? "visible" : "hidden",
              transform: `translate3d(0, ${chartsTranslateY}px, 0)`,
            }}
            aria-hidden={chartsReveal < 0.01}
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <Image
                src="/hero/sozupay_dashboard.png"
                alt="SozuPay dashboard"
                width={3248}
                height={1906}
                className="h-auto w-[min(100%,520px)] max-w-none rounded-2xl object-contain shadow-[0_24px_80px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/10 lg:w-full lg:max-w-[640px]"
                priority
              />
            </div>

            <div className="relative mx-auto w-full max-w-[440px] lg:ml-auto lg:mr-0">
              <div className="rounded-[32px] border border-white/10 bg-[rgba(20,20,20,0.55)] p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-7 cursor-default transition-all duration-300 ease-out hover:scale-[1.02] hover:border-white/20 hover:bg-[rgba(26,26,26,0.65)] hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.55),0_0_80px_-20px_rgba(255,255,255,0.06)]">
                <div className="mb-4 flex items-start justify-between gap-4 md:mb-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/45">
                      {copy.stats.capitalLabel}
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-white md:text-3xl">
                      {copy.stats.capitalValue}
                    </p>
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#ff8000]/20 md:size-11">
                    <Image
                      src="/hero/chart-icon.svg"
                      alt=""
                      width={24}
                      height={22}
                      className="h-5 w-5"
                    />
                  </div>
                </div>
                <div className="flex h-[90px] items-center justify-center overflow-hidden rounded-xl md:h-[108px]">
                  <Image
                    src="/hero/chart-line.svg"
                    alt=""
                    width={400}
                    height={120}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              <div className="absolute -right-1 top-0 w-[134px] rounded-3xl border border-white/10 bg-[rgba(20,20,20,0.75)] px-3 py-3 text-center shadow-lg backdrop-blur-md sm:right-2 sm:w-[150px] sm:px-4 sm:py-3.5 cursor-default transition-all duration-300 ease-out will-change-transform hover:scale-[1.06] hover:border-white/22 hover:z-20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.55),0_0_50px_-10px_rgba(255,128,0,0.14)]">
                <p className="text-[30px] font-light leading-none text-orange-500 sm:text-[34px]">
                  {copy.stats.creditScore}
                </p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-white/40 sm:text-[9px]">
                  {copy.stats.creditLabel}
                </p>
              </div>

              <div className="absolute -left-1 bottom-2 w-[200px] rounded-[20px] border border-white/10 bg-[rgba(20,20,20,0.75)] px-3.5 py-3.5 shadow-lg backdrop-blur-md sm:-left-5 sm:w-[220px] sm:px-4 sm:py-4 cursor-default transition-all duration-300 ease-out will-change-transform hover:scale-[1.06] hover:border-white/22 hover:z-20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.55),0_0_50px_-10px_rgba(255,128,0,0.14)]">
                <div className="mb-2.5 flex items-center justify-between text-[11px] text-white/40 sm:mb-3">
                  <span>{copy.stats.vaultLabel}</span>
                  <span>{copy.stats.vaultPercent}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[78%] rounded-full bg-orange-500" />
                </div>
                <div className="mt-2.5 flex gap-2 sm:mt-3">
                  <span className="size-2 rounded-full bg-[#ff8000]" />
                  <span className="size-2 rounded-full bg-[#df774f]" />
                  <span className="size-2 rounded-full bg-[#800000]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection({ copy, basePath, onHeroScrollProgress }: HeroSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<unknown>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollProgressRef = useRef(0);

  const chartsReveal = chartsRevealProgress(scrollProgress);
  const contentReveal = isLoading ? 0 : heroContentReveal(scrollProgress);
  const splineComplete = scrollProgress >= 0.999;

  const handleSplineLoad = useCallback(() => {
    setSplineLoaded(true);
    window.setTimeout(() => {
      const el = trackRef.current?.querySelector("spline-viewer") as {
        application?: unknown;
      } | null;
      if (el?.application) splineAppRef.current = el.application;
    }, 1000);
  }, []);

  useEffect(() => {
    if (document.querySelector(`script[src="${SPLINE_VIEWER_SCRIPT}"]`)) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = SPLINE_VIEWER_SCRIPT;
    script.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const minTimeout = window.setTimeout(() => {
      if (splineLoaded || hasError) setIsLoading(false);
    }, 2000);
    return () => window.clearTimeout(minTimeout);
  }, [splineLoaded, hasError]);

  useEffect(() => {
    if (!splineLoaded) {
      const fallback = window.setTimeout(() => setSplineLoaded(true), 5000);
      return () => window.clearTimeout(fallback);
    }
  }, [splineLoaded]);

  useEffect(() => {
    if (splineLoaded || hasError) {
      const hide = window.setTimeout(() => setIsLoading(false), 300);
      return () => window.clearTimeout(hide);
    }
  }, [splineLoaded, hasError]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const applyScrollProgress = useCallback(
    (progress: number) => {
      const clamped = Math.min(1, Math.max(0, progress));
      scrollProgressRef.current = clamped;
      setScrollProgress(clamped);
      onHeroScrollProgress?.(clamped);
      if (splineAppRef.current) {
        setSplineScrollProgress(splineAppRef.current, clamped);
      }
    },
    [onHeroScrollProgress]
  );

  const syncProgressFromDocument = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    // When the browser reports scrollY ≤ 0 (top of page, incl. elastic overscroll),
    // force to exactly 0 so hero content is guaranteed invisible.
    if (window.scrollY <= 0) {
      applyScrollProgress(0);
      return;
    }
    applyScrollProgress(getScrollProgress(track));
  }, [applyScrollProgress]);

  const nudgeHeroScroll = useCallback(
    (delta: number) => {
      const track = trackRef.current;
      if (!track || isLoading) return;

      const scrollable = getScrollableDistance(track);
      if (scrollable <= 0) return;

      const current = scrollProgressRef.current;
      if (current >= 1) return;
      // Already at the top and scrolling further up — nothing to do.
      if (current <= 0 && delta < 0) {
        applyScrollProgress(0);
        return;
      }

      const next = Math.min(1, Math.max(0, current + delta));
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      applyScrollProgress(next);
      window.scrollTo({ top: trackTop + next * scrollable, behavior: "auto" });
    },
    [applyScrollProgress, isLoading]
  );

  useEffect(() => {
    onHeroScrollProgress?.(0);
  }, [onHeroScrollProgress]);

  useEffect(() => {
    if (isLoading) return;

    syncProgressFromDocument();

    const onScroll = () => syncProgressFromDocument();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const onWheel = (e: WheelEvent) => {
      const track = trackRef.current;
      if (!track || !isHeroTrackInView(track)) return;
      if (scrollProgressRef.current >= 1) return;
      // At the very top scrolling up — let the browser handle it (elastic scroll, etc.)
      // and force progress to 0 so content is guaranteed invisible.
      if (scrollProgressRef.current <= 0 && e.deltaY < 0) {
        applyScrollProgress(0);
        return;
      }

      const fromLayout = getScrollProgress(track);
      if (fromLayout > scrollProgressRef.current + 0.01) {
        applyScrollProgress(fromLayout);
        return;
      }

      if (Math.abs(e.deltaY) < 1) return;
      e.preventDefault();
      nudgeHeroScroll(e.deltaY * WHEEL_SCROLL_SPEED);
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const track = trackRef.current;
      if (!track || !isHeroTrackInView(track)) return;
      if (scrollProgressRef.current >= 1) return;

      const deltaY = touchStartY - e.touches[0].clientY;
      if (Math.abs(deltaY) < 4) return;

      // Swiping up (negative deltaY) at the very top — release control and force 0.
      if (scrollProgressRef.current <= 0 && deltaY < 0) {
        applyScrollProgress(0);
        touchStartY = e.touches[0].clientY;
        return;
      }

      e.preventDefault();
      nudgeHeroScroll(deltaY * TOUCH_SCROLL_SPEED);
      touchStartY = e.touches[0].clientY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [isLoading, syncProgressFromDocument, applyScrollProgress, nudgeHeroScroll]);

  const sceneOpacity = Math.max(0.45, 1 - scrollProgress * 0.35);
  const sceneScale = 1 + scrollProgress * 0.05;
  const showScrollHint =
    !isLoading && scrollProgress < 0.08 && chartsReveal < 0.05;

  return (
    <section
      id="hero"
      className="relative z-10 bg-black"
    >
      {isLoading ? (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black"
          aria-busy="true"
          aria-label="Loading"
        >
          <div className="font-mono text-3xl tracking-wider text-white">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="inline-block opacity-30"
                style={{
                  animation: "slashPulse 1s ease-in-out infinite",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                /
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div
        ref={trackRef}
        id="spline-hero"
        className="relative"
        style={{ height: `${(1 + SCROLL_TRACK_VH) * 100}svh` }}
        aria-label="Interactive introduction"
      >
        <div
          className="sticky top-0 isolate h-[100svh] w-full overflow-hidden bg-black"
          style={{ pointerEvents: splineComplete ? "none" : undefined }}
        >
          <div className="absolute inset-0 z-0 bg-black" aria-hidden />

          <div
            className="hero-spline-layer pointer-events-none absolute inset-0 overflow-hidden"
            style={{ opacity: sceneOpacity }}
          >
            <div
              className="h-full w-full origin-center will-change-transform"
              style={{
                transform: `scale(${sceneScale * (isMobile ? 1.2 : 1.5)})`,
                transformOrigin: "center center",
              }}
            >
              {!hasError ? (
                <spline-viewer
                  url={SPLINE_SCENE_URL}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    background: "transparent",
                    pointerEvents: "none",
                  }}
                  onLoad={handleSplineLoad}
                />
              ) : (
                <div className="h-full w-full bg-black" />
              )}
            </div>
          </div>

          <div
            className="hero-content-layer absolute inset-0"
            style={{
              visibility: isLoading ? "hidden" : "visible",
              pointerEvents: isLoading ? "none" : undefined,
            }}
            aria-hidden={isLoading}
          >
            <HeroContentOverlay
              copy={copy}
              basePath={basePath}
              chartsReveal={isLoading ? 0 : chartsReveal}
              contentReveal={contentReveal}
              visible={!isLoading}
            />
          </div>

          {showScrollHint ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-8 z-[3] flex flex-col items-center gap-2 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
                {copy.scrollHint}
              </span>
              <span
                className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
                aria-hidden
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

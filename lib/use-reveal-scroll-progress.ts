"use client";

import { useMotionValue } from "motion/react";
import { useEffect, type RefObject } from "react";

/**
 * Maps element position in the viewport to 0–1 progress (window scroll).
 * More reliable than useScroll when refs sit inside transformed/layout-heavy sections.
 */
export function useRevealScrollProgress(
  targetRef: RefObject<HTMLElement | null>,
  /** Viewport Y (0–1) where reveal starts — element top at or below this → progress 0 */
  startViewport = 0.9,
  /** Viewport Y (0–1) where reveal completes — element top at or above this → progress 1 */
  endViewport = 0.35
) {
  const progress = useMotionValue(0);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    let raf = 0;

    const update = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const startY = viewportHeight * startViewport;
      const endY = viewportHeight * endViewport;
      const span = startY - endY;

      if (span <= 0) {
        progress.set(rect.top <= endY ? 1 : 0);
        return;
      }

      const value = (startY - rect.top) / span;
      progress.set(Math.min(1, Math.max(0, value)));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const observer = new ResizeObserver(onScroll);
    observer.observe(element);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, [targetRef, startViewport, endViewport, progress]);

  return progress;
}

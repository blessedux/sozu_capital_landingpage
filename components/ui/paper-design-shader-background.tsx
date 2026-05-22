"use client";

import { GrainGradient } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

/** Shared shader config — SOZU orange/amber palette. */
const SHADER_PROPS = {
  colorBack: "hsl(0, 0%, 4%)" as const,
  softness: 0.72,
  intensity: 0.38,
  noise: 0.08,
  shape: "corners" as const,
  offsetX: 0,
  offsetY: 0.1,
  scale: 1.1,
  rotation: 0,
  speed: 0.6,
  colors: ["hsl(22, 100%, 52%)", "hsl(38, 100%, 48%)", "hsl(14, 90%, 38%)"],
};

/**
 * Full-bleed animated grain-gradient background.
 * Sits at z-index -10 — parent must be `relative overflow-hidden`.
 */
export function GradientBackground() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      <GrainGradient style={{ height: "100%", width: "100%" }} {...SHADER_PROPS} />
    </div>
  );
}

/**
 * Single circular shader orb for use as a decorative accent.
 * Absolutely positioned — parent must be `relative`.
 * Pass positioning / size via `className` (e.g. `left-0 top-1/2 h-[500px] w-[500px]`).
 */
export function GradientOrb({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute overflow-hidden rounded-full",
        className
      )}
    >
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        {...SHADER_PROPS}
        softness={0.88}
        intensity={0.52}
        noise={0.12}
        speed={0.45}
        offsetX={-0.15}
        offsetY={0}
      />
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import { TranscriptBubble } from "./TranscriptBubble";

export type ScrollMessageLine = {
  id: string;
  role: "user" | "assistant";
  text: string;
  action?: { label: string; href: string };
};

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/** Thinking dots: fade in → hold → fade out, all driven by scroll position */
function thinkOpacity(reveal: number): number {
  const start = 0.1;
  const peakEnd = 0.38;
  const end = 0.52;

  if (reveal < start || reveal >= end) return 0;
  if (reveal < peakEnd) {
    return easeOutCubic((reveal - start) / (peakEnd - start));
  }
  return 1 - easeOutCubic((reveal - peakEnd) / (end - peakEnd));
}

/** Assistant reply after thinking phase */
function contentOpacity(reveal: number): number {
  const start = 0.5;
  if (reveal <= start) return 0;
  return easeOutCubic((reveal - start) / (1 - start));
}

function ThinkingDots() {
  return (
    <div className="flex w-full justify-start px-0.5" aria-hidden>
      <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-white/50"
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
            transition={{
              duration: 0.85,
              repeat: Infinity,
              delay: i * 0.14,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DemoActionLabel({ label }: { label: string }) {
  return (
    <span
      className="mt-2.5 inline-flex text-sm font-semibold text-[#ff8000]/85 cursor-default select-none"
      aria-hidden
    >
      {label}
    </span>
  );
}

type Props = {
  line: ScrollMessageLine;
  reveal: number;
};

export function ScrollDrivenMessage({ line, reveal }: Props) {
  if (reveal <= 0.001) return null;

  if (line.role === "user") {
    const t = easeOutCubic(clamp01(reveal / 0.55));
    return (
      <div
        className="w-full origin-bottom-right will-change-[transform,opacity]"
        style={{
          opacity: t,
          transform: `translateY(${(1 - t) * 22}px) scale(${0.94 + t * 0.06})`,
          filter: `blur(${(1 - t) * 6}px)`,
        }}
      >
        <TranscriptBubble role="user" className="[&>div]:text-[14px]">
          {line.text}
        </TranscriptBubble>
      </div>
    );
  }

  const thinkT = thinkOpacity(reveal);
  const contentT = contentOpacity(reveal);

  return (
    <div className="flex w-full flex-col gap-2">
      {thinkT > 0.01 ? (
        <div
          className="will-change-opacity"
          style={{ opacity: thinkT }}
        >
          <ThinkingDots />
        </div>
      ) : null}
      {contentT > 0.01 ? (
        <div
          className="w-full origin-bottom-left will-change-[transform,opacity]"
          style={{
            opacity: contentT,
            transform: `translateY(${(1 - contentT) * 20}px) scale(${0.95 + contentT * 0.05})`,
            filter: `blur(${(1 - contentT) * 5}px)`,
          }}
        >
          <TranscriptBubble role="assistant" className="[&>div]:text-[13px]">
            <span>{line.text}</span>
            {line.action ? <DemoActionLabel label={line.action.label} /> : null}
          </TranscriptBubble>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { DemoIntentId } from "@/lib/finance-engine/intents";
import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import { cn } from "@/lib/utils";
import { TranscriptBubble } from "./TranscriptBubble";
import { VoiceOrb } from "./VoiceOrb";
import { useScriptedTurn } from "./use-scripted-turn";

type Props = {
  copy: LandingCopy["voiceDemo"];
  locale: LandingLocale;
  basePath: string;
  compact?: boolean;
};

export function VoiceDemoExperience({
  copy,
  locale,
  basePath,
  compact = false,
}: Props) {
  const { lines, state, playTurn, reset } = useScriptedTurn(locale);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const onMic = () => {
    const intent = copy.prompts[0]?.intentId ?? "runway";
    void playTurn(intent as DemoIntentId);
  };

  return (
    <div
      className={cn(
        "flex flex-col",
        compact ? "gap-6" : "mx-auto max-w-2xl gap-8"
      )}
    >
      {!compact ? (
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff8000]">
            {copy.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-3 text-base text-white/65">{copy.subtitle}</p>
        </div>
      ) : null}

      <div
        className={cn(
          "flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm",
          compact ? "p-4" : "p-6 sm:p-8"
        )}
      >
        <div
          ref={scrollRef}
          className={cn(
            "flex flex-col gap-3 overflow-y-auto",
            compact ? "min-h-[200px] max-h-[240px]" : "min-h-[280px] max-h-[360px]"
          )}
          aria-live="polite"
          aria-relevant="additions"
        >
          {lines.length === 0 ? (
            <p className="py-8 text-center text-sm text-white/40">{copy.emptyHint}</p>
          ) : (
            lines.map((line) => (
              <TranscriptBubble key={line.id} role={line.role}>
                <span>{line.text}</span>
                {line.action ? (
                  <span
                    className="mt-2.5 inline-flex text-sm font-semibold text-[#ff8000]/85 cursor-default select-none"
                    aria-hidden
                  >
                    {line.action.label}
                  </span>
                ) : null}
              </TranscriptBubble>
            ))
          )}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 border-t border-white/10 pt-6">
          <VoiceOrb
            listening={state === "listening" || state === "thinking"}
            onClick={onMic}
            label={copy.micLabel}
            disabled={state !== "idle"}
          />
          <p className="text-center text-xs text-white/45">
            {state === "listening"
              ? copy.listening
              : state === "thinking"
                ? copy.thinking
                : copy.micHint}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {(compact ? copy.prompts.slice(0, 4) : copy.prompts).map((p) => (
          <button
            key={p.intentId}
            type="button"
            disabled={state !== "idle"}
            onClick={() => void playTurn(p.intentId as DemoIntentId)}
            className={cn(
              "rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-left text-sm text-white/80",
              "transition-colors hover:border-[#ff8000]/40 hover:bg-[#ff8000]/10 hover:text-white",
              "disabled:opacity-40"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {!compact && lines.length > 0 ? (
        <button
          type="button"
          onClick={reset}
          className="mx-auto text-sm text-white/40 underline-offset-2 hover:text-white/70 hover:underline"
        >
          {copy.reset}
        </button>
      ) : null}

      {compact ? (
        <Link
          href={`${basePath}/demo`}
          className="mx-auto inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#ff8000] to-[#df774f] px-8 py-3 text-sm font-bold text-black"
        >
          {copy.ctaFull}
        </Link>
      ) : null}
    </div>
  );
}

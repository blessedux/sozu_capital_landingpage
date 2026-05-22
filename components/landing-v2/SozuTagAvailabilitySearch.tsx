"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import { cn } from "@/lib/utils";

type CheckMode = "tag" | "domain";

type AvailabilityState =
  | { status: "idle" }
  | { status: "checking" }
  | {
      status: "result";
      normalized: string | null;
      available: boolean | null;
      invalid: boolean;
      message: string;
    }
  | { status: "error"; message: string };

type Props = {
  messages: LandingCopy["tagSearch"];
  locale: LandingLocale;
  onboardingHref: string;
  examples?: readonly string[];
};

const ORANGE_GLOW =
  "radial-gradient(circle, rgba(255,128,0,0.08) 0%, rgba(255,128,0,0) 70%)";

function buildOnboardingHref(
  base: string,
  mode: CheckMode,
  normalized: string | null,
  available: boolean
): string {
  if (!normalized || !available) return base;
  const key = mode === "tag" ? "tag" : "domain";
  const value = mode === "tag" ? normalized.replace(/^\$/, "") : normalized;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${key}=${encodeURIComponent(value)}`;
}

export function SozuTagAvailabilitySearch({
  messages,
  locale,
  onboardingHref,
  examples = ["$joaquin", "$cafe.noma", "importadora.cl"],
}: Props) {
  const id = useId();
  const [mode, setMode] = useState<CheckMode>("tag");
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [state, setState] = useState<AvailabilityState>({ status: "idle" });

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query.trim()), 400);
    return () => window.clearTimeout(t);
  }, [query]);

  const runCheck = useCallback(
    async (q: string, checkMode: CheckMode) => {
      if (!q) {
        setState({ status: "idle" });
        return;
      }
      setState({ status: "checking" });
      try {
        const params = new URLSearchParams({ q, locale, mode: checkMode });
        const res = await fetch(`/api/sozu-tags/availability?${params.toString()}`, {
          method: "GET",
        });
        const data = (await res.json()) as {
          ok?: boolean;
          normalized?: string | null;
          available?: boolean | null;
          invalid?: boolean;
          message?: string;
        };
        if (!res.ok || !data.ok) {
          setState({ status: "error", message: messages.errorGeneric });
          return;
        }
        setState({
          status: "result",
          normalized: data.normalized ?? null,
          available: data.available ?? null,
          invalid: Boolean(data.invalid),
          message: data.message ?? "",
        });
      } catch {
        setState({ status: "error", message: messages.errorNetwork });
      }
    },
    [locale, messages.errorGeneric, messages.errorNetwork]
  );

  useEffect(() => {
    if (!debounced) {
      setState({ status: "idle" });
      return;
    }
    void runCheck(debounced, mode);
  }, [debounced, mode, runCheck]);

  const walletHref = useMemo(() => {
    if (state.status !== "result" || state.invalid || state.available !== true) {
      return onboardingHref;
    }
    return buildOnboardingHref(onboardingHref, mode, state.normalized, true);
  }, [mode, onboardingHref, state]);

  const inputPrefix = mode === "tag" ? "$" : null;
  const label = mode === "tag" ? messages.labelTag : messages.labelDomain;
  const placeholder =
    mode === "tag" ? messages.placeholderTag : messages.placeholderDomain;
  const hint = mode === "tag" ? messages.hintTag : messages.hintDomain;

  const applyExample = (example: string) => {
    const cleaned = example.replace(/^[\s$@]+/u, "");
    const nextMode: CheckMode = cleaned.includes(".") ? "domain" : "tag";
    setMode(nextMode);
    setQuery(cleaned);
  };

  return (
    <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0d0d0d] p-8 md:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 size-[280px]"
        style={{ backgroundImage: ORANGE_GLOW }}
      />

      <div className="relative">
        <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-white md:text-[28px] md:leading-9">
          {messages.cardTitle}
        </h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/50 md:text-base">
          {messages.cardDescription}
        </p>

        <div
          className="mt-8 inline-flex rounded-full border border-white/10 bg-black/40 p-1"
          role="tablist"
          aria-label={messages.cardTitle}
        >
          {(
            [
              { id: "tag" as const, label: messages.modeTag },
              { id: "domain" as const, label: messages.modeDomain },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={mode === tab.id}
              onClick={() => {
                setMode(tab.id);
                setQuery("");
                setState({ status: "idle" });
              }}
              className={cn(
                "rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-all",
                mode === tab.id
                  ? "bg-[#ff8000] text-black font-semibold shadow-[0_0_12px_rgba(255,128,0,0.35)]"
                  : "text-white/50 hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <label
          htmlFor={id}
          className="mt-8 block font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff8000]"
        >
          {label}
        </label>

        <div className="mt-3 flex items-stretch overflow-hidden rounded-2xl border border-white/10 bg-black/50 transition-colors focus-within:border-[#ff8000]/40">
          {inputPrefix ? (
            <span
              className="flex items-center pl-5 font-mono text-lg text-white/40 select-none"
              aria-hidden
            >
              {inputPrefix}
            </span>
          ) : null}
          <input
            id={id}
            type="text"
            inputMode={mode === "domain" ? "url" : "text"}
            autoComplete="off"
            spellCheck={false}
            placeholder={placeholder}
            value={query}
            onChange={(e) =>
              setQuery(
                e.target.value
                  .replace(/^[\s$@]+/u, "")
                  .replace(/\s+/gu, mode === "domain" ? "" : "")
              )
            }
            className={cn(
              "min-w-0 flex-1 bg-transparent py-4 font-mono text-base text-white placeholder:text-white/25 focus:outline-none",
              inputPrefix ? "pr-5" : "px-5"
            )}
          />
          {state.status === "checking" ? (
            <span className="flex items-center pr-5 font-mono text-[10px] uppercase tracking-wide text-white/40">
              {messages.checking}
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-xs text-white/35">{hint}</p>

        {state.status === "result" ? (
          <output
            className={cn(
              "mt-5 flex flex-wrap items-center gap-2 rounded-xl border px-4 py-3 text-sm",
              state.invalid && "border-white/10 bg-white/[0.03]",
              !state.invalid &&
                state.available === true &&
                "border-[#ff8000]/30 bg-[rgba(255,128,0,0.08)]",
              !state.invalid &&
                state.available === false &&
                "border-amber-500/25 bg-amber-500/[0.06]"
            )}
            aria-live="polite"
          >
            {state.invalid ? (
              <span className="text-white/55">{state.message}</span>
            ) : (
              <>
                <span className="font-mono font-semibold text-[#ff8000]">
                  {state.normalized}
                </span>
                <span className="text-white/50">— {state.message}</span>
              </>
            )}
          </output>
        ) : null}

        {state.status === "error" ? (
          <p className="mt-5 text-sm text-white/60" role="alert">
            {state.message}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href={walletHref}
            className="inline-flex w-fit items-center justify-center rounded-full bg-[#ff8000] px-8 py-3.5 text-sm font-bold text-black shadow-[0_0_10px_rgba(255,128,0,0.3)] transition-opacity hover:opacity-90"
          >
            {messages.createWalletCta}
          </Link>
          <p className="max-w-sm text-xs leading-relaxed text-white/40">
            {messages.createWalletHint}
          </p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">
            {messages.examplesLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => applyExample(ex)}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-sm text-[#ff8000]/90 transition-colors hover:border-[#ff8000]/30 hover:bg-[rgba(255,128,0,0.08)]"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

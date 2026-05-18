"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import { cn } from "@/lib/utils";

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
};

export function SozuTagAvailabilitySearch({ messages, locale, onboardingHref }: Props) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [state, setState] = useState<AvailabilityState>({ status: "idle" });

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query.trim()), 400);
    return () => window.clearTimeout(t);
  }, [query]);

  const runCheck = useCallback(
    async (q: string) => {
      if (!q) {
        setState({ status: "idle" });
        return;
      }
      setState({ status: "checking" });
      try {
        const params = new URLSearchParams({ q, locale });
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
    [messages.errorGeneric, messages.errorNetwork]
  );

  useEffect(() => {
    if (!debounced) {
      setState({ status: "idle" });
      return;
    }
    void runCheck(debounced);
  }, [debounced, runCheck]);

  return (
    <div className="mb-12 max-w-xl">
      <label
        htmlFor={id}
        className="font-mono text-xs uppercase tracking-[0.2em] text-primary block mb-3"
      >
        {messages.label}
      </label>
      <div className="relative flex items-center gap-2 rounded-2xl border border-border/60 bg-surface-elevated/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] focus-within:border-primary/40 transition-colors">
        <span
          className="pl-4 font-mono text-muted select-none pointer-events-none"
          aria-hidden
        >
          $
        </span>
        <input
          id={id}
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          placeholder={messages.placeholder}
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
                .replace(/^[\s$@]+/u, "")
                .replace(/\s+/gu, "")
            )
          }
          className="flex-1 min-w-0 bg-transparent py-4 pr-4 font-mono text-base text-foreground placeholder:text-muted/50 focus:outline-none"
        />
        {state.status === "checking" ? (
          <span className="pr-4 font-mono text-[11px] uppercase tracking-wide text-muted shrink-0">
            {messages.checking}
          </span>
        ) : null}
      </div>

      <p className="mt-2 text-xs text-muted">{messages.hint}</p>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
        <Link
          href={onboardingHref}
          className="inline-flex w-fit items-center justify-center rounded-xl font-mono text-sm uppercase tracking-wide bg-primary text-primary-foreground px-6 py-3.5 hover:bg-primary/90 transition-colors shadow-[0_0_0_1px_rgba(255,199,0,0.15)]"
        >
          {messages.createWalletCta}
        </Link>
        <p className="text-xs text-muted max-w-sm leading-relaxed sm:pl-1">
          {messages.createWalletHint}
        </p>
      </div>

      {state.status === "result" ? (
        <output
          className={cn(
            "mt-4 block rounded-xl border px-4 py-3 text-sm",
            state.invalid && "border-border/60 bg-surface/40",
            !state.invalid && state.available === true && "border-primary/35 bg-primary/5",
            !state.invalid && state.available === false && "border-amber-500/25 bg-amber-500/[0.06]"
          )}
          aria-live="polite"
        >
          {state.invalid ? (
            <span className="text-muted">{state.message}</span>
          ) : state.available === true ? (
            <>
              <span className="font-mono text-primary font-medium">{state.normalized}</span>
              <span className="text-muted"> — {state.message}</span>
            </>
          ) : (
            <>
              <span className="font-mono text-foreground/80 font-medium">
                {state.normalized}
              </span>
              <span className="text-muted"> — {state.message}</span>
            </>
          )}
        </output>
      ) : null}

      {state.status === "error" ? (
        <p className="mt-4 text-sm text-foreground/70" role="alert">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}

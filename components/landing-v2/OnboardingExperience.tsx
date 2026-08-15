"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { LandingCopy } from "@/lib/landing-copy";
import { cn } from "@/lib/utils";

const successEase = [0.22, 1, 0.36, 1] as const;

type Props = {
  copy: LandingCopy["onboarding"];
  basePath: string;
  reserved?: string | null;
  reservedKind?: "tag" | "domain" | null;
};

export function OnboardingExperience({
  copy,
  basePath,
  reserved,
  reservedKind,
}: Props) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const homeHref = basePath || "/";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: "onboarding",
          metadata: {
            reserved,
            reservedKind,
            path: `${basePath}/onboarding`,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        return;
      }

      if (response.status === 409) {
        setIsSubmitted(true);
        return;
      }

      setError(data.error || copy.errorJoin);
    } catch {
      setError(copy.errorNetwork);
    } finally {
      setIsLoading(false);
    }
  };

  const waitlistCard = (
    <div className="rounded-[32px] border border-white/15 bg-[rgba(11,18,24,0.72)] p-8 shadow-lg backdrop-blur-md md:p-10">
      {isSubmitted ? (
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: successEase }}
            className="font-display text-2xl font-bold tracking-[-0.02em] text-[#f5fbfc] md:text-[28px]"
          >
            {copy.successTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: successEase }}
            className="mt-4 text-base leading-7 text-white/70"
          >
            {copy.successBody}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.34, ease: successEase }}
          >
            <Link
              href={homeHref}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-base font-bold text-[#0b1218] shadow-lg transition-transform hover:scale-[1.02]"
            >
              {copy.successCta}
            </Link>
          </motion.div>
        </div>
      ) : (
        <>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.1875rem] text-[var(--antiquity-cyan)]">
            {copy.formEyebrow}
          </p>
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#f5fbfc] md:text-[28px]">
            {copy.formTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/65 md:text-base md:leading-7">
            {copy.formHint}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label htmlFor="onboarding-email" className="sr-only">
              {copy.emailPlaceholder}
            </label>
            <input
              id="onboarding-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={copy.emailPlaceholder}
              required
              autoComplete="email"
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-base text-[#f5fbfc] placeholder:text-white/40 transition-[border-color,box-shadow] focus:border-[var(--antiquity-cyan)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--antiquity-cyan)]/25"
            />

            {error ? (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className={cn(
                "w-full rounded-full bg-white px-8 py-4 text-base font-bold text-[#0b1218] shadow-lg transition-transform",
                "hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              {isLoading ? copy.loading : copy.submit}
            </button>
          </form>

          <p className="mt-5 text-xs leading-5 text-white/45">
            {copy.privacyNote}
          </p>
        </>
      )}
    </div>
  );

  return (
    <main aria-label={copy.ariaLabel} className="relative">
      {/* Hero — Sozu tokens video plane */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0b1218] pt-[4.5rem] md:pt-20">
        {!reduceMotion ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
          >
            <source src="/sozu_coins_pingpong.webm" type="video/webm" />
          </video>
        ) : null}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(11,18,24,0.92)] via-[rgba(11,18,24,0.55)] to-[rgba(11,18,24,0.35)]"
        />

        <div className="relative z-[1] mx-auto w-full max-w-[75rem] px-5 pb-16 pt-10 md:px-12 md:pb-20 md:pt-16 xl:px-20">
          <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:gap-16 xl:gap-20">
            <div className="max-w-2xl text-left">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.1875rem] text-[var(--antiquity-cyan)]">
                {copy.eyebrow}
              </p>
              <h1 className="font-display text-4xl font-bold leading-tight tracking-[-0.02em] text-[#f5fbfc] md:text-[56px] md:leading-[1.08]">
                {copy.titleLine1}
                <br />
                {copy.titleLine2}
              </h1>
              <p className="mt-6 text-lg leading-8 text-white/70 md:text-xl md:leading-9">
                {copy.intro}
              </p>
              <p className="mt-4 whitespace-pre-line text-base leading-7 text-white/55 md:text-lg md:leading-8">
                {copy.mission}
              </p>

              {reserved ? (
                <div className="mt-8 inline-flex flex-col items-start gap-1 rounded-2xl border border-[var(--antiquity-cyan)]/30 bg-[var(--antiquity-cyan)]/10 px-6 py-4">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--antiquity-cyan)]">
                    {copy.reservedLabel}
                  </span>
                  <span className="font-mono text-xl font-medium text-[#f5fbfc] md:text-2xl">
                    {reserved}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="w-full lg:justify-self-end">{waitlistCard}</div>
          </div>
        </div>
      </section>

      {/* What you get — solid plane below the video */}
      <section
        id="what-you-get"
        aria-labelledby="what-you-get-heading"
        className="relative z-10 border-t border-border bg-background"
      >
        <div className="mx-auto max-w-[75rem] px-5 py-20 md:px-12 md:py-28 xl:px-20">
          <div className="mb-12 max-w-2xl text-left md:mb-16">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.1875rem] text-primary">
              {copy.benefitsEyebrow}
            </p>
            <h2
              id="what-you-get-heading"
              className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground md:text-3xl"
            >
              {copy.benefitsTitle}
            </h2>
          </div>

          <ol className="relative m-0 list-none space-y-0 p-0">
            {copy.benefits.map((benefit, index) => {
              const step = String(index + 1).padStart(2, "0");
              const isLast = index === copy.benefits.length - 1;

              return (
                <li
                  key={benefit.title}
                  className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 md:gap-x-8"
                >
                  <div className="flex flex-col items-center">
                    <span
                      aria-hidden
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-mono text-xs font-medium tracking-wider text-primary md:size-12 md:text-sm"
                    >
                      {step}
                    </span>
                    {!isLast ? (
                      <span
                        aria-hidden
                        className="mt-1 w-px flex-1 bg-border"
                      />
                    ) : null}
                  </div>

                  <div
                    className={cn(
                      "min-w-0 pb-10 md:pb-12",
                      isLast && "pb-0 md:pb-0"
                    )}
                  >
                    <h3 className="pt-2 text-xs font-bold uppercase tracking-[0.1875rem] text-primary md:pt-3">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                      {benefit.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import type { LandingCopy } from "@/lib/landing-copy";
import { cn } from "@/lib/utils";

const CTA_GLOW =
  "radial-gradient(circle, rgba(255,128,0,0.14) 0%, rgba(255,128,0,0) 65%)";

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
    <div className="rounded-[32px] border border-white/10 bg-[#0c0c0f]/90 p-8 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] backdrop-blur-sm md:p-10">
      {isSubmitted ? (
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: successEase }}
            className="font-display text-2xl font-bold tracking-[-0.02em] text-white md:text-[28px]"
          >
            {copy.successTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: successEase }}
            className="mt-4 text-base leading-7 text-white/60"
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
              className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#ff8000] to-[#df774f] px-10 py-4 text-base font-bold text-black shadow-[0_4px_15px_rgba(255,128,0,0.35)] transition-opacity hover:opacity-95"
            >
              {copy.successCta}
            </Link>
          </motion.div>
        </div>
      ) : (
        <>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
            {copy.formEyebrow}
          </p>
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-white md:text-[28px]">
            {copy.formTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/55 md:text-base md:leading-7">
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
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-base text-white placeholder:text-white/35 transition-[border-color,box-shadow] focus:border-[#ff8000]/40 focus:outline-none focus:ring-2 focus:ring-[#ff8000]/20"
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
                "w-full rounded-full bg-gradient-to-br from-[#ff8000] to-[#df774f] px-8 py-4 text-base font-bold text-black shadow-[0_4px_15px_rgba(255,128,0,0.35)] transition-opacity",
                "hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              {isLoading ? copy.loading : copy.submit}
            </button>
          </form>

          <p className="mt-5 text-xs leading-5 text-white/35">
            {copy.privacyNote}
          </p>
        </>
      )}
    </div>
  );

  return (
    <main
      aria-label={copy.ariaLabel}
      className="relative isolate min-h-dvh pt-[4.5rem] md:pt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 z-0 size-[min(900px,120vw)] -translate-x-1/2"
        style={{ backgroundImage: CTA_GLOW }}
      />

      <div className="relative z-[1] mx-auto max-w-[75rem] px-5 pb-20 md:px-12 md:pb-28 xl:px-20">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-end lg:gap-16 xl:gap-20">
          <div className="max-w-2xl text-left">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
              {copy.eyebrow}
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-[-0.02em] text-white md:text-[56px] md:leading-[1.08]">
              {copy.titleLine1}
              <br />
              {copy.titleLine2}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/65 md:text-xl md:leading-9">
              {copy.intro}
            </p>
            <p className="mt-4 whitespace-pre-line text-base leading-7 text-white/50 md:text-lg md:leading-8">
              {copy.mission}
            </p>

            {reserved ? (
              <div className="mt-8 inline-flex flex-col items-start gap-1 rounded-2xl border border-[#ff8000]/25 bg-[#ff8000]/10 px-6 py-4">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#ff8000]">
                  {copy.reservedLabel}
                </span>
                <span className="font-mono text-xl font-medium text-white md:text-2xl">
                  {reserved}
                </span>
              </div>
            ) : null}
          </div>

          <div className="w-full lg:justify-self-end">{waitlistCard}</div>
        </div>

        <div className="mt-20 md:mt-28">
          <div className="mb-10 max-w-2xl text-left md:mb-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
              {copy.benefitsEyebrow}
            </p>
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
              {copy.benefitsTitle}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {copy.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-[28px] border border-white/5 bg-[#111] p-7 transition-[border-color,box-shadow] duration-300 hover:border-[#ff8000]/20 hover:shadow-[0_0_40px_rgba(255,128,0,0.07)] md:p-8"
              >
                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.1875rem] text-[#ff8000]">
                  {benefit.title}
                </h3>
                <p className="leading-relaxed text-white/55">{benefit.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

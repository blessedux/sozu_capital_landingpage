"use client";

import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import { SiteHeader } from "./SiteHeader";
import { FooterSection } from "./FooterSection";

export type CardPageProps = {
  locale: LandingLocale;
  copy: LandingCopy;
};

export function CardPage({ locale, copy }: CardPageProps) {
  const basePath = locale === "en" ? "/en" : "";
  const t = copy.cardPage;

  return (
    <div className="landing-v2-grain min-h-screen bg-[#0a0a0a] text-white">
      <SiteHeader copy={copy} basePath={basePath} />
      <main className="relative z-[2] flex min-h-[calc(100vh-72px)] flex-col pt-20 md:min-h-[calc(100vh-80px)]">
        <section
          aria-label={t.ariaLabel}
          className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-24 md:px-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,128,0,0.08)_0%,rgba(255,128,0,0)_70%)]"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
            <span className="mb-8 inline-flex rounded-full border border-[#ff8000]/30 bg-[#ff8000]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#ff8000]">
              {t.statusBadge}
            </span>

            <h1 className="font-display text-4xl font-bold tracking-[-0.02em] text-white md:text-[56px] md:leading-[1.1]">
              {t.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/60">{t.description}</p>

            <a
              href={t.rndHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex rounded-full bg-[#ff8000] px-8 py-3.5 text-sm font-bold text-black shadow-[0_0_10px_rgba(255,128,0,0.3)] transition-colors hover:bg-[#ff8000]/90"
            >
              {t.rndCta}
            </a>
          </div>
        </section>
      </main>
      <FooterSection copy={copy.footer} basePath={basePath} />
    </div>
  );
}

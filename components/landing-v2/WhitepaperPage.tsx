import Link from "next/link";
import type { LandingCopy, LandingLocale } from "@/lib/landing-copy";
import { SiteHeader } from "./SiteHeader";
import { WhySozuSection } from "./WhySozuSection";
import { FooterSection } from "./FooterSection";

export type WhitepaperPageProps = {
  locale: LandingLocale;
  copy: LandingCopy;
};

export function WhitepaperPage({ locale, copy }: WhitepaperPageProps) {
  const basePath = locale === "en" ? "/en" : "";
  const wp = copy.whitepaperPage;
  const developersHref = `${basePath}/product#pay-receipt-flow`;

  return (
    <div className="landing-v2-grain min-h-screen bg-background text-foreground">
      <SiteHeader copy={copy} basePath={basePath} />
      <main className="relative z-[2] pt-20 [&>section:nth-child(even)]:bg-surface/40">
        <WhySozuSection copy={copy.whySozu} />

        <section
          id="developers"
          aria-labelledby="whitepaper-developers-heading"
          className="scroll-mt-24 border-b border-border/50 py-20 md:py-28"
        >
          <div className="container max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
              {wp.developersEyebrow}
            </p>
            <h2
              id="whitepaper-developers-heading"
              className="font-display text-3xl md:text-4xl font-semibold text-foreground tracking-tight text-balance"
            >
              {wp.developersTitle}
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-2xl">
              {wp.developersDescription}
            </p>
            <Link
              href={developersHref}
              className="mt-10 inline-flex items-center justify-center rounded-full bg-[#ff8000] px-8 py-3.5 text-sm font-bold text-black shadow-[0_0_10px_rgba(255,128,0,0.3)] transition-opacity hover:opacity-90"
            >
              {wp.developersCta}
            </Link>
          </div>
        </section>
      </main>
      <FooterSection copy={copy.footer} basePath={basePath} />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import type { LandingCopy } from "@/lib/landing-copy";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  copy: LandingCopy;
  basePath: string;
  /** When set (home hero), nav fades in with scroll. Omit on other pages for always-visible nav. */
  heroScrollProgress?: number;
};

const navLinkClass =
  "font-sans text-sm font-medium uppercase tracking-[0.06em] text-white/60 transition-colors hover:text-white";

/** Nav links and actions appear shortly after scroll starts */
function navChromeReveal(scrollProgress: number): number {
  if (scrollProgress <= 0.03) return 0;
  if (scrollProgress >= 0.22) return 1;
  return (scrollProgress - 0.03) / 0.19;
}

export function SiteHeader({
  copy,
  basePath,
  heroScrollProgress,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const p = (href: string) => `${basePath}${href}`;
  const chromeReveal =
    heroScrollProgress !== undefined ? navChromeReveal(heroScrollProgress) : 1;

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] border-b border-transparent bg-transparent">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-5 md:h-20 md:px-12 lg:px-20">
        <Link
          href={p("#hero")}
          className="flex shrink-0 items-center gap-3"
          style={{ opacity: chromeReveal }}
          onClick={() => setOpen(false)}
        >
          <img
            src="/sozucapital_logo_tb.png"
            alt={copy.header.logoAlt}
            className="h-11 w-11 md:h-12 md:w-12"
          />
          <span className="font-display text-2xl font-bold tracking-[-0.04em] text-white">
            {copy.header.brand}
          </span>
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex xl:gap-10"
          style={{
            opacity: chromeReveal,
            pointerEvents: chromeReveal > 0.15 ? "auto" : "none",
          }}
          aria-label="Primary"
          aria-hidden={chromeReveal < 0.01}
        >
          {copy.nav.map((item) => (
            <Link key={item.href} href={p(item.href)} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          className="flex shrink-0 items-center gap-4 md:gap-6"
          style={{
            opacity: chromeReveal,
            pointerEvents: chromeReveal > 0.15 ? "auto" : "none",
          }}
          aria-hidden={chromeReveal < 0.01}
        >
          <Link
            href={p("/onboarding")}
            className="hidden text-sm font-medium text-white sm:inline"
          >
            {copy.header.login}
          </Link>
          <Link
            href={p("/onboarding")}
            className="inline-flex rounded-full bg-[#ff8000] px-5 py-2.5 text-sm font-bold text-black shadow-[0_0_10px_rgba(255,128,0,0.3)] md:px-6"
          >
            {copy.header.startMission}
          </Link>
          <Link
            href={copy.lang.otherLocaleHref}
            aria-label={copy.lang.switchAria}
            className="inline-flex h-9 min-w-[2.75rem] items-center justify-center rounded-lg border border-white/10 font-mono text-xs font-semibold uppercase tracking-wide text-white/80"
          >
            {copy.lang.otherLocaleLabel}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label={copy.header.menuAria}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-white/10 px-3 font-mono text-xs uppercase text-white lg:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {copy.header.menu}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-transparent transition-[max-height] duration-300 ease-out lg:hidden",
          open ? "max-h-[420px]" : "max-h-0"
        )}
        style={{ opacity: chromeReveal }}
        aria-hidden={chromeReveal < 0.01}
      >
        <nav className="flex flex-col gap-1 px-5 py-4 md:px-12">
          {copy.nav.map((item) => (
            <Link
              key={item.href}
              href={p(item.href)}
              className={cn(navLinkClass, "py-2")}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={p("/onboarding")}
            className="py-2 text-sm font-medium text-white"
            onClick={() => setOpen(false)}
          >
            {copy.header.login}
          </Link>
          <Link
            href={p("/onboarding")}
            className="mt-2 inline-flex w-fit rounded-full bg-[#ff8000] px-6 py-2.5 text-sm font-bold text-black shadow-[0_0_10px_rgba(255,128,0,0.3)]"
            onClick={() => setOpen(false)}
          >
            {copy.header.startMission}
          </Link>
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import type { LandingCopy } from "@/lib/landing-copy";
import { cn } from "@/lib/utils";

type HeroActionPanelProps = {
  copy: LandingCopy["hero"];
  basePath: string;
  className?: string;
};

/** Subtitle + CTA — sticky above Tags, covered by CashOut */
export function HeroActionPanel({
  copy,
  basePath,
  className,
}: HeroActionPanelProps) {
  return (
    <div
      className={cn(
        "flex max-w-md flex-col items-start gap-5 md:max-w-sm lg:max-w-md",
        className
      )}
    >
      <p className="whitespace-pre-line text-base leading-7 text-[#d5e2e6] md:text-lg md:leading-8">
        {copy.body}
      </p>
      <Link
        href={`${basePath}/onboarding`}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#0b1218] shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-transform hover:scale-[1.02] md:text-base"
      >
        {copy.ctaPrimary}
        <span aria-hidden className="text-lg leading-none">
          →
        </span>
      </Link>
    </div>
  );
}

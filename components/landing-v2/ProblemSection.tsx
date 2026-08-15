"use client";

import Link from "next/link";
import type { LandingCopy } from "@/lib/landing-copy";

type Props = {
  copy: LandingCopy["problem"];
  basePath: string;
};

export function ProblemSection({ copy, basePath }: Props) {
  return (
    <section
      id="problem"
      aria-label={copy.ariaLabel}
      className="relative bg-background px-6 py-24 md:px-12 md:py-32 lg:py-40"
    >
      <div className="mx-auto flex max-w-[75rem] flex-col gap-16 lg:gap-20">
        <div className="flex max-w-[34rem] flex-col">
          <h2 className="font-display text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-foreground md:text-[40px] md:leading-[1.12]">
            {copy.title}
          </h2>

          <p className="mt-5 max-w-[30rem] text-lg leading-8 text-muted md:text-xl md:leading-[30px]">
            {copy.subheading}
          </p>

          <ul className="mt-8 list-none space-y-3 pl-0">
            {copy.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex gap-3 text-[17px] leading-7 text-foreground md:text-[18px]"
              >
                <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <Link
            href={`${basePath}/onboarding?product=sozupay`}
            className="mt-10 inline-flex w-fit rounded-2xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02]"
          >
            {copy.cta}
          </Link>
        </div>

        <div className="max-w-[36rem] self-end text-right">
          <p className="font-display text-[22px] font-semibold leading-8 text-foreground md:text-[26px] md:leading-9">
            {copy.closingLine}
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { LandingCopy } from "@/lib/landing-copy";

type Props = {
  copy: LandingCopy["pricing"];
  basePath: string;
};

type BillingPeriod = "monthly" | "yearly";

function FeatureRow({
  label,
  accent,
}: {
  label: string;
  accent?: boolean;
}) {
  return (
    <li className="flex items-center gap-3">
      <Image
        src={accent ? "/figma/pricing/check-accent.svg" : "/figma/pricing/check.svg"}
        alt=""
        width={accent ? 12 : 11}
        height={12}
        aria-hidden
      />
      <span className="text-xs leading-4 text-[#9ca3af]">{label}</span>
    </li>
  );
}

function PricingCard({
  plan,
  ctaHref,
  featured,
}: {
  plan: LandingCopy["pricing"]["plans"][number];
  ctaHref: string;
  featured?: boolean;
}) {
  const priceDisplay =
    plan.price === "free" ? (
      <p className="text-5xl font-bold leading-none text-white">Free</p>
    ) : (
      <p className="flex items-baseline gap-2">
        <span className="text-5xl font-bold leading-none tracking-tight text-white">
          {plan.price}
        </span>
        <span className="text-sm text-[#6b7280]">{plan.period}</span>
      </p>
    );

  const cardClass = featured
    ? "relative rounded-[40px] border border-[rgba(249,115,22,0.3)] bg-[#1a1210] p-10 shadow-[0_0_50px_10px_rgba(255,87,34,0.2)]"
    : "rounded-[40px] border border-white/5 bg-[#111] p-10";

  const buttonClass = featured
    ? "flex w-full items-center justify-center rounded-xl bg-[#ea580c] py-4 text-sm font-semibold text-white transition-colors hover:bg-[#ea580c]/90"
    : "flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10";

  return (
    <article className={cardClass}>
      {featured && plan.badge ? (
        <span className="absolute left-1/2 top-[-16px] -translate-x-1/2 rounded-full bg-[#ea580c] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.05em] text-white">
          {plan.badge}
        </span>
      ) : null}

      <h3 className="pb-2 text-xl font-semibold leading-7 text-white">{plan.name}</h3>
      <p className="pb-12 text-xs leading-4 text-[#6b7280]">{plan.description}</p>
      <div className="pb-12">{priceDisplay}</div>
      <Link href={ctaHref} className={`mb-10 ${buttonClass}`}>
        {plan.cta}
      </Link>
      <ul className="flex flex-col gap-4">
        {plan.features.map((feature) => (
          <FeatureRow key={feature} label={feature} accent={featured} />
        ))}
      </ul>
    </article>
  );
}

export function PricingSection({ copy, basePath }: Props) {
  const [billing, setBilling] = useState<BillingPeriod>("yearly");
  const ctaHref = `${basePath}/onboarding`;

  const plans = copy.plans.map((plan) => {
    if (billing === "yearly" && plan.priceYearly) {
      return { ...plan, price: plan.priceYearly, period: plan.periodYearly ?? plan.period };
    }
    return plan;
  });

  return (
    <section
      id="pricing"
      aria-label={copy.ariaLabel}
      className="px-6 py-32 md:px-36"
    >
      <div className="mx-auto flex max-w-[72rem] flex-col gap-16 px-6">
        <header className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-4xl font-bold leading-10 tracking-tight text-white">
            {copy.title}
          </h2>
          <p className="max-w-md text-base leading-6 text-[#9ca3af]">{copy.description}</p>

          <div
            className="flex items-center rounded-full border border-white/10 bg-white/5 p-1.5"
            role="tablist"
            aria-label={copy.billingToggleLabel}
          >
            <button
              type="button"
              role="tab"
              aria-selected={billing === "monthly"}
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-6 py-2 text-xs font-semibold transition-colors ${
                billing === "monthly"
                  ? "bg-[#ea580c] text-white"
                  : "text-[#9ca3af] hover:text-white"
              }`}
            >
              {copy.monthly}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={billing === "yearly"}
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-6 py-2 text-xs font-semibold transition-colors ${
                billing === "yearly"
                  ? "bg-[#ea580c] text-white"
                  : "text-[#9ca3af] hover:text-white"
              }`}
            >
              {copy.yearly}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              ctaHref={ctaHref}
              featured={plan.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { LandingCopy } from "@/lib/landing-copy";

type Props = {
  copy: LandingCopy["pathways"];
  basePath: string;
};

const CARD_REVEAL = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: index * 0.18,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function FeatureBullet({
  label,
  color,
}: {
  label: string;
  color: "emerald" | "orange";
}) {
  const dotClass =
    color === "emerald" ? "bg-[#34d399]" : "bg-[#f97316]";

  return (
    <li className="flex items-center gap-4">
      <span className={`size-2 shrink-0 rounded-full ${dotClass}`} aria-hidden />
      <span className="text-base font-medium leading-6 text-white/80">{label}</span>
    </li>
  );
}

function PathwayCard({
  variant,
  label,
  title,
  description,
  features,
  cta,
  ctaHref,
  iconSrc,
  arrowSrc,
  index,
}: {
  variant: "individual" | "business";
  label: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  iconSrc: string;
  arrowSrc: string;
  index: number;
}) {
  const isBusiness = variant === "business";
  const labelColor = isBusiness ? "text-[#34d399]" : "text-[#f97316]";
  const iconBg = isBusiness ? "bg-[rgba(52,211,153,0.1)]" : "bg-[rgba(255,128,0,0.1)]";
  const bulletColor = isBusiness ? "orange" : "emerald";

  const ctaClass = isBusiness
    ? "bg-[#ff8000] font-bold text-black shadow-[0_0_15px_rgba(255,128,0,0.3)] group-hover:bg-[#ff9a33]"
    : "border border-white/10 bg-white/5 text-white group-hover:border-[#ff8000]/30 group-hover:bg-white/10";

  return (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "-60px" }}
      variants={CARD_REVEAL}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[40px] border border-white/5 bg-[#0d0d0d] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[#ff8000]/25 hover:shadow-[0_0_48px_rgba(255,128,0,0.12)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-br from-[rgba(255,128,0,0.18)] via-[rgba(255,128,0,0.08)] to-[rgba(255,128,0,0.02)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[#ff8000]/10 opacity-0 blur-3xl transition-opacity duration-700 ease-out group-hover:opacity-100"
      />

      <div className="relative z-10 flex flex-col justify-between p-12">
        <div className="flex flex-col gap-6 pb-12">
          <div className="flex items-center gap-4">
            <div
              className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${iconBg} transition-colors duration-500 group-hover:bg-[rgba(255,128,0,0.15)]`}
            >
              <Image src={iconSrc} alt="" width={24} height={24} aria-hidden />
            </div>
            <p className={`text-base font-semibold tracking-[0.025em] ${labelColor}`}>{label}</p>
          </div>

          <h3 className="text-[36px] font-bold leading-[45px] text-white">{title}</h3>

          <p className="text-lg leading-[30px] text-white/60">{description}</p>

          <ul className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
            {features.map((feature) => (
              <FeatureBullet key={feature} label={feature} color={bulletColor} />
            ))}
          </ul>
        </div>

        <Link
          href={ctaHref}
          className={`inline-flex w-fit items-center gap-4 rounded-full px-8 py-4 text-base font-semibold transition-colors duration-300 ${ctaClass}`}
        >
          {cta}
          <Image src={arrowSrc} alt="" width={11} height={12} className="h-3 w-[10.5px]" aria-hidden />
        </Link>
      </div>
    </motion.article>
  );
}

export function PathwaysSection({ copy, basePath }: Props) {
  const onboardingHref = `${basePath}/onboarding`;

  return (
    <section
      id="pathways"
      aria-label={copy.ariaLabel}
      className="relative overflow-hidden bg-[#0a0a0a] px-5 py-32 md:px-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 size-[400px]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,128,0,0.08) 0%, rgba(255,128,0,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 size-[400px]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(223,119,79,0.08) 0%, rgba(223,119,79,0) 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-[75rem] flex-col items-center">
        <header className="flex max-w-[56rem] flex-col items-center pb-24 text-center">
          <p className="pb-4 text-sm font-bold uppercase tracking-[0.1875rem] text-[#f97316]">
            {copy.eyebrow}
          </p>
          <h2 className="font-display pb-8 text-4xl font-bold leading-none tracking-[-0.02em] text-white md:text-[60px] md:leading-[60px]">
            {copy.titleLine1}
            <br />
            {copy.titleLine2}
            <br />
            {copy.titleLine3}
          </h2>
          <div
            aria-hidden
            className="h-1 w-24 rounded-full bg-gradient-to-r from-[#ff8000] to-[#df774f]"
          />
        </header>

        <div className="relative grid w-full max-w-[75rem] grid-cols-1 gap-10 lg:grid-cols-2">
          <PathwayCard
            index={0}
            variant="individual"
            label={copy.individuals.label}
            title={copy.individuals.title}
            description={copy.individuals.description}
            features={copy.individuals.features}
            cta={copy.individuals.cta}
            ctaHref={onboardingHref}
            iconSrc="/figma/pathways/icon-individual.svg"
            arrowSrc="/figma/pathways/arrow-light.svg"
          />
          <PathwayCard
            index={1}
            variant="business"
            label={copy.businesses.label}
            title={copy.businesses.title}
            description={copy.businesses.description}
            features={copy.businesses.features}
            cta={copy.businesses.cta}
            ctaHref={onboardingHref}
            iconSrc="/figma/pathways/icon-business.svg"
            arrowSrc="/figma/pathways/arrow-dark.svg"
          />
        </div>
      </div>
    </section>
  );
}

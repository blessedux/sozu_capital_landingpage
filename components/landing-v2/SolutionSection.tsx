"use client";

import Image from "next/image";
import type { LandingCopy } from "@/lib/landing-copy";

type Props = { copy: LandingCopy["solution"] };

function SolutionCard({
  icon,
  iconWidth,
  iconHeight,
  title,
  description,
}: LandingCopy["solution"]["cards"][number]) {
  return (
    <article className="flex flex-col gap-6 rounded-[24px] border border-border bg-surface px-10 pb-16 pt-10 shadow-lg">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
        <Image
          src={icon}
          alt=""
          width={iconWidth}
          height={iconHeight}
          className="h-6 w-auto max-w-[27px]"
          aria-hidden
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold leading-[30px] text-foreground">{title}</h3>
        <p className="text-[15px] leading-6 text-muted">{description}</p>
      </div>
    </article>
  );
}

export function SolutionSection({ copy }: Props) {
  return (
    <section
      id="solution"
      aria-label={copy.ariaLabel}
      className="relative bg-background px-6 py-24 md:px-[7.5rem] md:py-40"
    >
      <div className="mx-auto max-w-[75rem]">
        <header className="mx-auto mb-16 flex max-w-[50rem] flex-col items-center gap-6 text-center md:mb-24">
          <p className="text-sm font-bold uppercase tracking-[0.1875rem] text-primary">
            {copy.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.02em] text-foreground md:text-[56px] md:leading-[1.2]">
            {copy.title}
          </h2>
        </header>

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-[36rem] md:mx-0 md:max-w-none">
            <div className="relative aspect-[575/391] w-full min-h-[280px]">
              <Image
                src="/figma/solution/bank.webp"
                alt=""
                fill
                className="object-contain object-left-bottom"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {copy.cards.map((card) => (
              <SolutionCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

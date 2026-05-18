"use client";

import Image from "next/image";
import type { LandingCopy } from "@/lib/landing-copy";
import { CardSticky, ContainerScroll } from "@/components/ui/card-sticky";
import { cn } from "@/lib/utils";

type Props = { copy: LandingCopy["solution"] };

const ORANGE_GLOW =
  "radial-gradient(circle, rgba(255,128,0,0.05) 0%, rgba(255,128,0,0) 70%)";

const STICKY_TOP = 96;
const CARD_STACK_OFFSET = 12;

function SolutionCard({
  icon,
  iconWidth,
  iconHeight,
  title,
  description,
}: LandingCopy["solution"]["cards"][number]) {
  return (
    <article className="flex flex-col gap-6 rounded-[32px] border border-white/5 bg-[rgba(30,30,30,0.4)] px-10 pb-16 pt-10 backdrop-blur-sm">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-white/5">
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
        <h3 className="text-xl font-semibold leading-[30px] text-white">{title}</h3>
        <p className="text-[15px] leading-6 text-white/50">{description}</p>
      </div>
    </article>
  );
}

export function SolutionSection({ copy }: Props) {
  const cardCount = copy.cards.length;

  return (
    <section
      id="solution"
      aria-label={copy.ariaLabel}
      className="relative overflow-x-clip !bg-[#0d0d0d] px-6 py-24 md:px-[7.5rem] md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-0 w-screen max-w-none -translate-x-1/2"
      >
        <Image
          src="/figma/solution/solution_background2.webp"
          alt=""
          width={1920}
          height={720}
          className="block h-auto w-full opacity-90"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#0d0d0d] md:h-32" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-200px] h-[600px] w-full max-w-[1000px] -translate-x-1/2 opacity-50"
        style={{ backgroundImage: ORANGE_GLOW }}
      />

      <div className="relative z-10 mx-auto max-w-[75rem]">
        <header className="mx-auto mb-16 flex max-w-[50rem] flex-col items-center gap-6 text-center md:mb-24">
          <p className="text-sm font-bold uppercase tracking-[0.1875rem] text-[#f97316]">
            {copy.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.02em] text-white md:text-[56px] md:leading-[1.2]">
            {copy.title}
          </h2>
        </header>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,24rem)]">
          <div
            className={cn(
              "relative mx-auto w-full max-w-[36rem] lg:mx-0 lg:max-w-none",
              "lg:sticky lg:top-24 lg:self-start"
            )}
          >
            <div className="relative aspect-[575/391] w-full min-h-[280px]">
              <Image
                src="/figma/solution/bank.webp"
                alt=""
                fill
                className="object-contain object-left-bottom"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:hidden">
            {copy.cards.map((card) => (
              <SolutionCard key={card.title} {...card} />
            ))}
          </div>

          <ContainerScroll className="hidden lg:block">
            {copy.cards.map((card, index) => (
              <CardSticky
                key={card.title}
                index={index}
                baseTop={STICKY_TOP}
                incrementY={CARD_STACK_OFFSET}
                incrementZ={10}
                className={cn(
                  "mb-6",
                  index === cardCount - 1 && "pb-[min(12rem,15vh)]"
                )}
              >
                <SolutionCard {...card} />
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
}

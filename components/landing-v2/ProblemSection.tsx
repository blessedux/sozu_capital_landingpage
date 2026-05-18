"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useMemo, useRef } from "react";
import type { LandingCopy } from "@/lib/landing-copy";
import { useRevealScrollProgress } from "@/lib/use-reveal-scroll-progress";
import { MagicText } from "@/components/ui/magic-text";

type Props = { copy: LandingCopy["problem"] };

const ORANGE_GLOW =
  "radial-gradient(circle, rgba(255,128,0,0.05) 0%, rgba(255,128,0,0) 70%)";

const TITLE_LINE_CLASS =
  "max-w-[30rem] text-[20px] font-normal leading-[26px]";
const TITLE_WORD_CLASS = "text-[20px] leading-[26px]";

export function ProblemSection({ copy }: Props) {
  const titleLines = [copy.line1, copy.line2, copy.line3, copy.line4, copy.line5];
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const { totalWords, wordOffsets } = useMemo(() => {
    const counts = titleLines.map(
      (line) => line.split(/\s+/).filter(Boolean).length
    );
    const offsets: number[] = [];
    let running = 0;
    for (const count of counts) {
      offsets.push(running);
      running += count;
    }
    return { totalWords: running, wordOffsets: offsets };
  }, [titleLines]);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.35"],
    layoutEffect: false,
  });

  const titleRevealProgress = useRevealScrollProgress(titleRef, 0.92, 0.38);

  const bottomY = useTransform(sectionProgress, [0, 1], [0, 20]);

  return (
    <section
      ref={sectionRef}
      id="problem"
      aria-label={copy.ariaLabel}
      className="relative min-h-[720px] overflow-hidden !bg-[#0a0a0a] lg:min-h-[880px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/figma/problem/problem_bg.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] from-0% via-transparent via-[39%] to-transparent" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-200px] z-0 h-[600px] w-full max-w-[1000px] -translate-x-1/2 opacity-50"
        style={{ backgroundImage: ORANGE_GLOW }}
      />

      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[75rem] flex-col justify-between gap-16 px-6 py-24 md:px-12 lg:min-h-[880px] lg:py-32 xl:px-20">
        <div ref={titleRef} className="flex max-w-[30rem] flex-col gap-0">
          {titleLines.map((line, index) => (
            <MagicText
              key={index}
              text={line}
              progress={titleRevealProgress}
              wordOffset={wordOffsets[index]}
              totalWords={totalWords}
              className={TITLE_LINE_CLASS}
              wordClassName={TITLE_WORD_CLASS}
            />
          ))}
        </div>

        <motion.div
          style={{ y: bottomY }}
          className="max-w-[39rem] self-end text-left lg:text-right"
        >
          <p className="text-[20px] leading-8 text-white">{copy.bodyLead}</p>
          <p className="mt-8 text-[20px] leading-8 text-white">{copy.bodyClose}</p>
        </motion.div>
      </div>
    </section>
  );
}

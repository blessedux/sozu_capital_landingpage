"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

export interface MagicTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  progress?: MotionValue<number>;
  scrollTarget?: React.RefObject<HTMLElement | null>;
  scrollOffset?: NonNullable<Parameters<typeof useScroll>[0]>["offset"];
  lineIndex?: number;
  lineCount?: number;
  wordOffset?: number;
  totalWords?: number;
  /** When true, words render full white (no dim-to-white reveal). */
  solidWhite?: boolean;
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  wordClassName?: string;
  solidWhite?: boolean;
}

const Word: React.FC<WordProps> = ({
  children,
  progress,
  range,
  wordClassName,
  solidWhite = false,
}) => {
  const color = useTransform(
    progress,
    range,
    ["rgba(255,255,255,0.25)", "rgba(255,255,255,1)"],
    { clamp: true }
  );

  if (solidWhite) {
    return (
      <span
        className={`mr-[0.25em] inline-block text-white ${wordClassName ?? ""}`}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.span
      style={{ color }}
      className={`mr-[0.25em] inline-block ${wordClassName ?? ""}`}
    >
      {children}
    </motion.span>
  );
};

type MagicTextContentProps = MagicTextProps & {
  progress: MotionValue<number>;
  paragraphRef?: React.Ref<HTMLParagraphElement>;
};

function MagicTextContent({
  text,
  className,
  wordClassName,
  progress,
  paragraphRef,
  lineIndex = 0,
  lineCount = 1,
  wordOffset = 0,
  totalWords,
  solidWhite = false,
}: MagicTextContentProps) {
  const words = text.split(/\s+/).filter(Boolean);
  const useGlobal = totalWords != null && totalWords > 0;

  return (
    <p ref={paragraphRef} className={className ?? "flex flex-wrap"}>
      {words.map((word, i) => {
        let start: number;
        let end: number;

        if (useGlobal) {
          const globalIndex = wordOffset + i;
          const slice = 1 / totalWords;
          // Slight overlap so each word visibly fades in during scroll
          start = Math.max(0, globalIndex * slice - slice * 0.15);
          end = Math.min(1, (globalIndex + 1) * slice + slice * 0.35);
        } else {
          const lineSlice = 1 / lineCount;
          const lineStart = lineIndex * lineSlice;
          const t0 = i / words.length;
          const t1 = (i + 1) / words.length;
          start = lineStart + t0 * lineSlice;
          end = lineStart + t1 * lineSlice;
        }

        return (
          <Word
            key={`${word}-${i}`}
            progress={progress}
            range={[start, Math.min(1, end)]}
            wordClassName={wordClassName}
            solidWhite={solidWhite}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function MagicTextWithScroll({
  scrollTarget,
  scrollOffset = ["start 0.88", "start 0.5"],
  ...props
}: MagicTextProps & {
  scrollOffset?: NonNullable<Parameters<typeof useScroll>[0]>["offset"];
}) {
  const localRef = React.useRef<HTMLParagraphElement>(null);
  const target = scrollTarget ?? localRef;

  const { scrollYProgress } = useScroll({
    target,
    offset: scrollOffset,
    layoutEffect: false,
  });

  return (
    <MagicTextContent
      {...props}
      progress={scrollYProgress}
      paragraphRef={scrollTarget ? undefined : localRef}
    />
  );
}

export const MagicText: React.FC<MagicTextProps> = (props) => {
  if (props.progress) {
    return <MagicTextContent {...props} progress={props.progress} />;
  }

  return <MagicTextWithScroll {...props} />;
};

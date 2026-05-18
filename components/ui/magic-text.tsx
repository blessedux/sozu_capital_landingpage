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
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  wordClassName?: string;
}

const Word: React.FC<WordProps> = ({
  children,
  progress,
  range,
  wordClassName,
}) => {
  const opacity = useTransform(progress, range, [0, 1], { clamp: true });

  return (
    <span
      className={`relative mr-[0.25em] inline-block ${wordClassName ?? ""}`}
    >
      <span className={`text-white/25 ${wordClassName ?? ""}`} aria-hidden>
        {children}
      </span>
      <motion.span
        style={{ opacity }}
        className={`absolute left-0 top-0 text-white ${wordClassName ?? ""}`}
        aria-hidden
      >
        {children}
      </motion.span>
    </span>
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
          start = globalIndex / totalWords;
          end = (globalIndex + 1) / totalWords;
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

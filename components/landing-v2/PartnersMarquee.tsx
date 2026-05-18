"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PartnerLogo } from "./partner-logos";

const ITEM_GAP_PX = 64;
const PIXELS_PER_FRAME = 1.25;
const ROTATE_Y = -28;
const ROTATE_X = 8;
const PERSPECTIVE = 1200;

type PartnersMarqueeProps = {
  logos: readonly PartnerLogo[];
  speed?: number;
  className?: string;
};

export function PartnersMarquee({
  logos,
  speed = 1,
  className,
}: PartnersMarqueeProps) {
  const frameRef = useRef(0);
  const setWidthRef = useRef(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const rendered = [...logos, ...logos, ...logos];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setWidthRef.current = trackRef.current.scrollWidth / 3;
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [logos]);

  useEffect(() => {
    if (reduceMotion) return;

    let raf = 0;

    const tick = () => {
      frameRef.current += speed;
      const setWidth = setWidthRef.current;

      if (setWidth > 0 && innerRef.current) {
        const offset = -((frameRef.current * PIXELS_PER_FRAME) % setWidth);
        innerRef.current.style.transform = `translateX(${offset}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, reduceMotion]);

  if (reduceMotion) {
    return (
      <div className={className}>
        <ul className="flex flex-wrap items-center justify-center gap-12 px-6">
          {logos.map((logo) => (
            <li key={logo.src} className="flex shrink-0 items-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-9 w-auto"
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "5.5rem",
        perspective: `${PERSPECTIVE}px`,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          transform: `rotateX(${ROTATE_X}deg) rotateY(${ROTATE_Y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            alignItems: "center",
          }}
        >
          <div
            ref={innerRef}
            style={{
              display: "flex",
              alignItems: "center",
              willChange: "transform",
            }}
          >
            {rendered.map((logo, i) => (
              <div
                key={`${logo.src}-${i}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  flexShrink: 0,
                  paddingRight: ITEM_GAP_PX,
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="h-9 w-auto opacity-100"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edge fades — match page background, not white */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--background) 0%, transparent 18%, transparent 82%, var(--background) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--background) 0%, transparent 25%, transparent 75%, var(--background) 100%)",
        }}
      />
    </div>
  );
}

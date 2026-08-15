"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export const HERO_VIDEO_SRC = "/hero/ascii-magic-6.mp4";
export const HERO_VIDEO_POSTER = "/hero/digital-antiquity-agora.png";
/** H.264 MP4 framing — shared by hero + mobile menu. */
export const HERO_VIDEO_OBJECT_POSITION = "object-[40%_center]";

type HeroBackgroundVideoProps = {
  className?: string;
  /** Fired once when the video can play or when we settle on the poster. */
  onReady?: () => void;
  /** Skip mounting the <video> until true (e.g. menu closed). */
  active?: boolean;
};

/**
 * iOS-stable background loop:
 * - Format: H.264 MP4 (Safari-compatible). WebM is not reliable on iOS.
 * - Requires muted + playsInline; set muted in JS (React attribute quirk).
 * - Programmatic play(); on reject (Low Power Mode etc.) keep poster only —
 *   never leave the native centered play control visible.
 */
export function HeroBackgroundVideo({
  className,
  onReady,
  active = true,
}: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const reduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const readyOnce = useRef(false);

  const markReady = () => {
    if (readyOnce.current) return;
    readyOnce.current = true;
    onReadyRef.current?.();
  };

  useEffect(() => {
    readyOnce.current = false;

    if (!active || reduceMotion) {
      setPlaying(false);
      markReady();
      return;
    }

    const video = videoRef.current;
    if (!video) {
      markReady();
      return;
    }

    // React can miss the muted IDL property on first paint — required for iOS autoplay.
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.disablePictureInPicture = true;
    video.controls = false;

    let cancelled = false;

    const tryPlay = async () => {
      try {
        await video.play();
        if (!cancelled) {
          setPlaying(true);
          markReady();
        }
      } catch {
        if (!cancelled) {
          setPlaying(false);
          markReady();
        }
      }
    };

    const onPlaying = () => {
      if (!cancelled) {
        setPlaying(true);
        markReady();
      }
    };

    video.addEventListener("playing", onPlaying);
    if (video.readyState >= 2) {
      void tryPlay();
    } else {
      video.addEventListener("loadeddata", () => void tryPlay(), { once: true });
      video.load();
    }

    const fallback = window.setTimeout(() => markReady(), 2000);

    return () => {
      cancelled = true;
      video.removeEventListener("playing", onPlaying);
      window.clearTimeout(fallback);
      video.pause();
    };
  }, [active, reduceMotion]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Poster always under — visible when autoplay is blocked (e.g. iOS Low Power Mode) */}
      <img
        src={HERO_VIDEO_POSTER}
        alt=""
        aria-hidden
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          HERO_VIDEO_OBJECT_POSITION
        )}
        draggable={false}
      />

      {active && !reduceMotion ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          poster={HERO_VIDEO_POSTER}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            HERO_VIDEO_OBJECT_POSITION,
            playing ? "opacity-100" : "opacity-0"
          )}
          aria-hidden
          tabIndex={-1}
        >
          {/* Explicit type helps Safari pick the H.264 stream reliably */}
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}

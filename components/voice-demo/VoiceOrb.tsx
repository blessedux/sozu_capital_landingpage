"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  listening?: boolean;
  onClick?: () => void;
  label: string;
  disabled?: boolean;
};

export function VoiceOrb({ listening, onClick, label, disabled }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "relative mx-auto flex size-24 items-center justify-center rounded-full",
        "bg-gradient-to-br from-[#ff8000] to-[#df774f] shadow-[0_0_40px_rgba(255,128,0,0.35)]",
        "transition-transform hover:scale-[1.02] active:scale-[0.98]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        listening && "scale-105"
      )}
    >
      {listening ? (
        <>
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-[#ff8000]/60"
            animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute inset-0 rounded-full border border-white/30"
            animate={{ scale: [1, 1.2], opacity: [0.4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
          />
        </>
      ) : null}
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        className="relative z-10 text-black"
        aria-hidden
      >
        <path
          d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z"
          fill="currentColor"
        />
        <path
          d="M19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V21H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-3.08A7 7 0 0 0 19 11Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

"use client";

import { cn } from "@/lib/utils";

type Props = {
  role: "user" | "assistant";
  children: React.ReactNode;
  className?: string;
};

export function TranscriptBubble({ role, children, className }: Props) {
  const isUser = role === "user";
  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start",
        className
      )}
    >
      <div
        className={cn(
          "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[15px] leading-snug sm:max-w-[88%]",
          isUser
            ? "bg-[#ff8000]/20 text-white"
            : "border border-white/10 bg-white/[0.06] text-white/90"
        )}
      >
        {isUser ? (
          <span className="mr-2 text-[#ff8000]" aria-hidden>
            🎙️
          </span>
        ) : null}
        {children}
      </div>
    </div>
  );
}

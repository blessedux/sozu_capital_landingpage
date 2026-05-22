"use client";

import { useCallback, useRef, useState } from "react";
import type { DemoIntentId } from "@/lib/finance-engine/intents";
import type { LandingLocale } from "@/lib/landing-copy";

export type TranscriptLine = {
  id: string;
  role: "user" | "assistant";
  text: string;
  action?: { label: string; href: string };
};

type State = "idle" | "listening" | "thinking";

export function useScriptedTurn(locale: LandingLocale) {
  const [lines, setLines] = useState<TranscriptLine[]>([]);
  const [state, setState] = useState<State>("idle");
  const idRef = useRef(0);
  const busyRef = useRef(false);

  const playTurn = useCallback(
    async (intentId: DemoIntentId) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setState("listening");

      await delay(700);
      setState("thinking");

      try {
        const res = await fetch("/api/voice-demo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ intentId, locale }),
        });
        const data = (await res.json()) as {
          ok?: boolean;
          userText?: string;
          assistantText?: string;
          assistantAction?: { label: string; href: string };
        };
        if (!res.ok || !data.ok || !data.userText || !data.assistantText) {
          throw new Error("demo_failed");
        }

        const userId = `u-${++idRef.current}`;
        setLines((prev) => [
          ...prev,
          { id: userId, role: "user", text: data.userText! },
        ]);
        await delay(400);
        setLines((prev) => [
          ...prev,
          {
            id: `a-${++idRef.current}`,
            role: "assistant",
            text: data.assistantText!,
            action: data.assistantAction,
          },
        ]);
      } catch {
        setLines((prev) => [
          ...prev,
          {
            id: `e-${++idRef.current}`,
            role: "assistant",
            text:
              locale === "es"
                ? "No pude cargar la demo. Probá de nuevo."
                : "Couldn't load the demo. Try again.",
          },
        ]);
      } finally {
        setState("idle");
        busyRef.current = false;
      }
    },
    [locale]
  );

  const reset = useCallback(() => {
    setLines([]);
    setState("idle");
    busyRef.current = false;
  }, []);

  return { lines, state, playTurn, reset };
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

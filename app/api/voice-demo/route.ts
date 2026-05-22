import { NextResponse } from "next/server";
import {
  runIntent,
  type DemoIntentId,
  DEMO_INTENT_IDS,
} from "@/lib/finance-engine/intents";
import type { LandingLocale } from "@/lib/landing-copy";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      intentId?: string;
      locale?: string;
    };
    const locale: LandingLocale = body.locale === "es" ? "es" : "en";
    const intentId = body.intentId as DemoIntentId | undefined;

    if (!intentId || !DEMO_INTENT_IDS.includes(intentId)) {
      return NextResponse.json(
        { ok: false, error: "invalid_intent" },
        { status: 400 }
      );
    }

    const result = runIntent(intentId, locale);
    return NextResponse.json({ ok: true, ...result });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

import type { LandingLocale } from "@/lib/landing-copy";
import { DEMO_LEDGER } from "./ledger";
import {
  canAfford,
  getCategorySpend,
  getEatingOutSpend,
  getMonthOverMonthDelta,
  getRunway,
  getTripCost,
  simulateSend,
  suggestDeliveryCut,
} from "./tools";

export type DemoIntentId =
  | "afford_weekend"
  | "uber_spend"
  | "send_camila"
  | "runway"
  | "food_spend"
  | "send_javier"
  | "afford_trip"
  | "eating_out"
  | "afford_laptop"
  | "save_tokyo"
  | "extra_savings";

export type DemoIntentAction = {
  label: string;
  href: string;
};

export type DemoIntentResult = {
  intentId: DemoIntentId;
  userText: string;
  assistantText: string;
  assistantAction?: DemoIntentAction;
};

function money(n: number, locale: LandingLocale) {
  return new Intl.NumberFormat(locale === "es" ? "es-AR" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n);
}

function pct(n: number, locale: LandingLocale) {
  return new Intl.NumberFormat(locale === "es" ? "es-AR" : "en-US", {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(n);
}

const EN: Record<DemoIntentId, (locale: LandingLocale) => DemoIntentResult> = {
  afford_weekend: (locale) => {
    const { percentLess } = getMonthOverMonthDelta();
    const { affordable } = canAfford(400);
    return {
      intentId: "afford_weekend",
      userText: "Can I afford to spend $400 this weekend?",
      assistantText:
        locale === "es"
          ? affordable
            ? `Sí. Gastaste ${pct(percentLess, locale)} menos que el mes pasado y aún tenés margen para alquiler y metas de ahorro.`
            : `Este finde conviene apretar: no alcanza el margen sin tocar alquiler o ahorro.`
          : affordable
            ? `Yes. You've spent ${pct(percentLess, locale)} less than last month and still have enough runway for rent and savings goals.`
            : `I'd hold off this weekend — you'd dip into rent or savings buffer.`,
    };
  },
  uber_spend: (locale) => {
    const total = getCategorySpend("transport", "Uber");
    return {
      intentId: "uber_spend",
      userText: "How much have I spent on Uber this month?",
      assistantText:
        locale === "es"
          ? `${money(total, locale)}. ¿Querés que arme un presupuesto semanal de transporte?`
          : `${money(total, locale)}. Want me to set a weekly transport budget?`,
    };
  },
  send_camila: (locale) => {
    const { seconds } = simulateSend(20, "Camila");
    return {
      intentId: "send_camila",
      userText: "Send Camila $20.",
      assistantText:
        locale === "es"
          ? `Listo. Acreditado en ${seconds} segundos.`
          : `Done. Settled in ${seconds} seconds.`,
    };
  },
  runway: (locale) => {
    const { days, safeToSpend } = getRunway();
    return {
      intentId: "runway",
      userText: "What's my runway this month?",
      assistantText:
        locale === "es"
          ? `Tenés unos ${days} días de margen con ${money(safeToSpend, locale)} libres después de alquiler y ahorro.`
          : `You've got about ${days} days of cushion — ${money(safeToSpend, locale)} safe after rent and savings.`,
    };
  },
  food_spend: (locale) => {
    const total = getCategorySpend("food");
    return {
      intentId: "food_spend",
      userText: "How much did I spend on food?",
      assistantText:
        locale === "es"
          ? `${money(total, locale)} en comida este mes. Delivery es la mitad.`
          : `${money(total, locale)} on food this month. Delivery is about half.`,
    };
  },
  send_javier: (locale) => {
    return {
      intentId: "send_javier",
      userText: "Send $12 to Javier.",
      assistantText:
        locale === "es" ? "Enviado $12 a Javier." : "Sent $12 to Javier.",
      assistantAction: {
        label: locale === "es" ? "Ver transacción" : "View transaction",
        href: "#",
      },
    };
  },
  afford_trip: (locale) => {
    const cost = getTripCost("buenos aires");
    const { affordable } = canAfford(cost);
    const buffer = suggestDeliveryCut(12);
    return {
      intentId: "afford_trip",
      userText: "Can I afford a trip to Buenos Aires next month?",
      assistantText:
        locale === "es"
          ? affordable
            ? `Si seguís al ritmo actual, sí. Recortar delivery un 12% te da ${money(buffer, locale)} extra de colchón.`
            : `Todavía no sin mover ahorro. Recortar delivery 12% suma ${money(buffer, locale)} este mes.`
          : affordable
            ? `If you keep spending at your current rate, yes. Cutting food delivery by 12% gives you another ${money(buffer, locale)} buffer.`
            : `Not yet without touching savings. A 12% delivery cut adds ${money(buffer, locale)} this month.`,
    };
  },
  eating_out: (locale) => {
    const total = getEatingOutSpend();
    return {
      intentId: "eating_out",
      userText: "How much did I spend eating out?",
      assistantText:
        locale === "es"
          ? `${money(total, locale)} fuera de casa en mayo.`
          : `${money(total, locale)} eating out in May.`,
    };
  },
  afford_laptop: (locale) => {
    const { affordable, remaining } = canAfford(1200);
    return {
      intentId: "afford_laptop",
      userText: "Can I afford a new laptop?",
      assistantText:
        locale === "es"
          ? affordable
            ? `Sí — te quedarían ${money(remaining, locale)} después de un equipo de ~${money(1200, locale)}.`
            : `Mejor esperar: un ${money(1200, locale)} te deja corto este mes.`
          : affordable
            ? `Yes — you'd still have ${money(remaining, locale)} left after a ~${money(1200, locale)} laptop.`
            : `I'd wait — a ${money(1200, locale)} purchase tightens this month.`,
    };
  },
  save_tokyo: (locale) => {
    const g = DEMO_LEDGER.goals[0];
    const left = g.target - g.saved;
    return {
      intentId: "save_tokyo",
      userText: "Help me save for a trip to Tokyo.",
      assistantText:
        locale === "es"
          ? `Meta Tokio: ${money(left, locale)} restantes. Con ${money(g.monthly, locale)}/mes llegás en ~${Math.ceil(left / g.monthly)} meses.`
          : `Tokyo goal: ${money(left, locale)} to go. At ${money(g.monthly, locale)}/mo you're ~${Math.ceil(left / g.monthly)} months out.`,
    };
  },
  extra_savings: (locale) => {
    const daysSaved = 24;
    return {
      intentId: "extra_savings",
      userText: "How much faster if I saved $5/day more?",
      assistantText:
        locale === "es"
          ? `Llegarías ~${daysSaved} días antes a Tokio con $5/día extra.`
          : `You'd hit Tokyo ~${daysSaved} days sooner with $5/day more.`,
    };
  },
};

export function runIntent(
  intentId: DemoIntentId,
  locale: LandingLocale
): DemoIntentResult {
  return EN[intentId](locale);
}

export const DEMO_INTENT_IDS = Object.keys(EN) as DemoIntentId[];

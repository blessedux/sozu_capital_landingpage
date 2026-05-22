import { DEMO_LEDGER } from "./ledger";

export function getCategorySpend(category: string, vendor?: string) {
  const rows = DEMO_LEDGER.transactions.filter((t) => {
    if (t.category !== category) return false;
    if (vendor && !t.vendor.toLowerCase().includes(vendor.toLowerCase())) return false;
    return true;
  });
  return Math.round(rows.reduce((s, t) => s + t.amount, 0) * 100) / 100;
}

export function getMonthOverMonthDelta() {
  const delta = DEMO_LEDGER.lastMonthTotalSpend - DEMO_LEDGER.currentMonthSpend;
  const pct =
    DEMO_LEDGER.lastMonthTotalSpend === 0
      ? 0
      : delta / DEMO_LEDGER.lastMonthTotalSpend;
  return { percentLess: Math.max(0, pct), dollarsLess: Math.max(0, delta) };
}

export function getObligations() {
  const f = DEMO_LEDGER.fixedMonthly;
  return f.rent + f.savingsGoal + f.essentials;
}

export function getSafeToSpend() {
  return Math.max(0, DEMO_LEDGER.balance - getObligations());
}

export function getRunway() {
  const daily = DEMO_LEDGER.currentMonthSpend / 15;
  const safe = getSafeToSpend();
  return {
    days: Math.round((safe / Math.max(daily, 1)) * 10) / 10,
    safeToSpend: Math.round(safe * 100) / 100,
  };
}

export function canAfford(amount: number) {
  const safe = getSafeToSpend();
  return {
    affordable: safe >= amount,
    safeToSpend: safe,
    remaining: Math.round((safe - amount) * 100) / 100,
  };
}

export function simulateSend(amount: number, contact: string) {
  return {
    contact,
    amount,
    seconds: Math.round((2.8 + amount * 0.02) * 10) / 10,
  };
}

export function getEatingOutSpend() {
  return getCategorySpend("food");
}

export function getTripCost(destination: string) {
  const key = destination.toLowerCase();
  for (const [name, cost] of Object.entries(DEMO_LEDGER.tripEstimates)) {
    if (key.includes(name)) return cost;
  }
  return 900;
}

/** Demo baseline ~$250/mo delivery → 12% cut ≈ $30 buffer in copy */
const DEMO_MONTHLY_DELIVERY = 250;

export function suggestDeliveryCut(percent: number) {
  return Math.round(DEMO_MONTHLY_DELIVERY * (percent / 100));
}

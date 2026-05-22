export const DEMO_LEDGER = {
  balance: 4280,
  monthlyIncome: 5500,
  fixedMonthly: { rent: 1800, savingsGoal: 400, essentials: 620 },
  lastMonthTotalSpend: 2940,
  currentMonthSpend: 2412,
  tripEstimates: { "buenos aires": 1150, tokyo: 2400 } as Record<string, number>,
  goals: [{ id: "tokyo", name: "Tokyo trip", target: 2400, saved: 840, monthly: 200 }],
  contacts: ["Camila", "Javier"],
  transactions: [
    { category: "food", vendor: "DoorDash", amount: 24.5 },
    { category: "food", vendor: "Uber Eats", amount: 18.2 },
    { category: "food", vendor: "Restaurant", amount: 73.5 },
    { category: "food", vendor: "Coffee", amount: 9.8 },
    { category: "transport", vendor: "Uber", amount: 82.0 },
    { category: "shopping", vendor: "Amazon", amount: 89 },
  ],
};

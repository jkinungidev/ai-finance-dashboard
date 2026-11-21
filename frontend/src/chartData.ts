import type { Transaction } from "./types";

export function totalsByCategory(transactions: Transaction[]) {
  const totals: Record<string, number> = {};

  for (const t of transactions) {
    if (t.type !== "Expense") continue; // skips income to single out the transactions
    totals[t.category] = (totals[t.category] ?? 0) + t.amount;
  }

  return Object.entries(totals).map(([category, total]) => ({
    category,
    total: Math.round(total * 100) / 100,
  }));
}
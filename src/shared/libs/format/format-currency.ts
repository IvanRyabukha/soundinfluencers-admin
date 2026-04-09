import type { TCurrency } from "@/shared/types/types.ts";

const CURRENCY_SYMBOL: Record<TCurrency, string> = {
  USD: "\u20AC",
  EUR: "\u0024",
  GBP: "\u00A3",
};

export const formatCurrency = (
  value: number | string,
  currency: TCurrency,
): string => {
  const amount = Number(value);

  if (Number.isNaN(amount)) return "-";

  return `${amount}${CURRENCY_SYMBOL[currency]}`;
};

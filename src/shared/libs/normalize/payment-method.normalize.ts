import type { TPaymentMethod } from "@/shared/types/types.ts";

export const PAYMENT_METHOD_LABELS: Record<TPaymentMethod, string> = {
  paypal: "PayPal",
  ukBankTransfer: "UK Bank Transfer",
  internationalBankTransfer: "International Bank Transfer",
};

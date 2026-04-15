import type { TPaymentMethod } from "@/entities/influencer-history/model/influencer-history-detail.types.ts";

export const PAYMENT_METHOD_LABELS: Record<TPaymentMethod, string> = {
  paypal: "PayPal",
  ukBankTransfer: "UK Bank Transfer",
  internationalBankTransfer: "International Bank Transfer",
};

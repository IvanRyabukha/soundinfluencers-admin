import type { TInvoiceStatus } from "@/entities/invoices/model/influencer-invoices.types.ts";

export const INFLUENCER_INVOICES_STATUS_LABEL: Record<TInvoiceStatus, string> = {
  submitted: "Submitted",
  paid: "Paid",
};

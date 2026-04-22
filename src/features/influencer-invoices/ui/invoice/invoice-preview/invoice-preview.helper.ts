import type {
  IInvoicePreviewRowConfig
} from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-preview.config.ts";
import type { TPaymentMethod } from "@/entities/influencer-history/model/influencer-history-detail.types.ts";
import type { IPaymentDetailsDto } from "@/entities/invoices/model/influencer-invoices.types.ts";

export const isNonEmptyValue = (value?: string | null): value is string => {
  return Boolean(value?.trim());
};

export const compactRows = (
  rows: Array<IInvoicePreviewRowConfig | null>,
): IInvoicePreviewRowConfig[] => {
  return rows.filter((row): row is IInvoicePreviewRowConfig => row !== null);
};

export const getPaymentDetailsLabel = (
  paymentMethod: TPaymentMethod,
  paymentDetails: IPaymentDetailsDto
) => {
  switch (paymentMethod) {
    case "internationalBankTransfer":
      return paymentDetails.iban;
    case "ukBankTransfer":
      return paymentDetails.accountNumber;
    case "paypal":
      return paymentDetails.paypalEmail;
    default:
      return '—';
  }
};

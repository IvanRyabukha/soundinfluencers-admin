import type { IInvoiceDetails } from "@/entities/influencer-invoices/model/influencer-invoices.types.ts";
import type { TCurrency } from "@/shared/types/types.ts";

export interface IInvoicePreviewRowConfig {
  key: string;
  label: string;
  value: string;
  labelWeight?: "default" | "medium";
}

export const getBillToRows = (
  invoiceDetails: IInvoiceDetails,
): IInvoicePreviewRowConfig[] => {
  return [
    {
      key: "chamberOfCommerce",
      label: "Chamber of commerce:",
      value: invoiceDetails.billTo.chamberOfCommerce,
    },
    {
      key: "email",
      label: "Email address:",
      value: invoiceDetails.billTo.email,
    },
    {
      key: "phoneNumber",
      label: "Phone number:",
      value: invoiceDetails.billTo.phoneNumber,
    },
    {
      key: "address",
      label: "Address:",
      value: invoiceDetails.billTo.address,
    },
  ];
};

export const getSummaryRows = (
  invoiceDetails: IInvoiceDetails,
  formatMoney: (amount: number, currency: TCurrency) => string,
): IInvoicePreviewRowConfig[] => {
  return [
    {
      key: "description",
      label: "Description:",
      value: invoiceDetails.summary.description,
      labelWeight: "medium",
    },
    {
      key: "total",
      label: "Total:",
      value: formatMoney(
        invoiceDetails.summary.total,
        invoiceDetails.summary.currency,
      ),
      labelWeight: "medium",
    },
    {
      key: "subtotal",
      label: "Subtotal:",
      value: formatMoney(
        invoiceDetails.summary.subtotal,
        invoiceDetails.summary.currency,
      ),
      labelWeight: "medium",
    },
    {
      key: "balanceDue",
      label: "Balance DUE:",
      value: formatMoney(
        invoiceDetails.summary.balanceDue,
        invoiceDetails.summary.currency,
      ),
      labelWeight: "medium",
    },
  ];
};

export const getBankDetailsRows = (
  invoiceDetails: IInvoiceDetails,
): IInvoicePreviewRowConfig[] => {
  if (!invoiceDetails.bankDetails) return [];

  return [
    {
      key: "bankName",
      label: "Bank Name:",
      value: invoiceDetails.bankDetails.bankName,
    },
    {
      key: "beneficiary",
      label: "Beneficiary:",
      value: invoiceDetails.bankDetails.beneficiary,
    },
    {
      key: "beneficiaryAddress",
      label: "Beneficiary Address:",
      value: invoiceDetails.bankDetails.beneficiaryAddress,
    },
    {
      key: "sortCode",
      label: "Sort Code:",
      value: invoiceDetails.bankDetails.sortCode,
    },
    {
      key: "accountNumber",
      label: "Account Number:",
      value: invoiceDetails.bankDetails.accountNumber,
    },
  ];
};

export const getPaypalRows = (
  invoiceDetails: IInvoiceDetails,
): IInvoicePreviewRowConfig[] => {
  if (!invoiceDetails.paypalEmail) return [];

  return [
    {
      key: "paypalEmail",
      label: "Paypal Email:",
      value: invoiceDetails.paypalEmail,
      labelWeight: "medium",
    },
  ];
};

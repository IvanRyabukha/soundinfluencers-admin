import type { IInvoiceDetails } from "@/entities/invoices/model/influencer-invoices.types.ts";
import type { TCurrency } from "@/shared/types/types.ts";
import {
  compactRows,
  isNonEmptyValue,
} from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-preview.helper.ts";

export interface IInvoicePreviewRowConfig {
  key: string;
  label: string;
  value: string;
  labelWeight?: "default" | "medium";
}

export const getBillToRows = (
  invoiceDetails: IInvoiceDetails,
): IInvoicePreviewRowConfig[] => {
  return compactRows([
    isNonEmptyValue(invoiceDetails.billTo.chamberOfCommerce)
      ? {
        key: "chamberOfCommerce",
        label: "Chamber of commerce:",
        value: invoiceDetails.billTo.chamberOfCommerce,
      }
      : null,
    isNonEmptyValue(invoiceDetails.billTo.email)
      ? {
        key: "email",
        label: "Email address:",
        value: invoiceDetails.billTo.email,
      }
      : null,
    isNonEmptyValue(invoiceDetails.billTo.phoneNumber)
      ? {
        key: "phoneNumber",
        label: "Phone number:",
        value: invoiceDetails.billTo.phoneNumber,
      }
      : null,
    isNonEmptyValue(invoiceDetails.billTo.address)
      ? {
        key: "address",
        label: "Address:",
        value: invoiceDetails.billTo.address,
      }
      : null,
  ]);
};

export const getSummaryRows = (
  invoiceDetails: IInvoiceDetails,
  formatMoney: (amount: number, currency: TCurrency) => string,
): IInvoicePreviewRowConfig[] => {
  return [
    // {
    //   key: "description",
    //   label: "Description:",
    //   value: invoiceDetails.summary.description,
    //   labelWeight: "medium",
    // },
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
  const bankDetails = invoiceDetails.bankDetails;

  if (!bankDetails) return [];

  return compactRows([
    isNonEmptyValue(bankDetails.bankName)
      ? {
        key: "bankName",
        label: "Bank Name:",
        value: bankDetails.bankName,
      }
      : null,
    isNonEmptyValue(bankDetails.beneficiary)
      ? {
        key: "beneficiary",
        label: "Beneficiary:",
        value: bankDetails.beneficiary,
      }
      : null,
    isNonEmptyValue(bankDetails.beneficiaryAddress)
      ? {
        key: "beneficiaryAddress",
        label: "Beneficiary Address:",
        value: bankDetails.beneficiaryAddress,
      }
      : null,
    isNonEmptyValue(bankDetails.sortCode)
      ? {
        key: "sortCode",
        label: "Sort Code:",
        value: bankDetails.sortCode,
      }
      : null,
    isNonEmptyValue(bankDetails.accountNumber)
      ? {
        key: "accountNumber",
        label: "Account Number:",
        value: bankDetails.accountNumber,
      }
      : null,
    isNonEmptyValue(bankDetails.iban)
      ? {
        key: "iban",
        label: "IBAN:",
        value: bankDetails.iban,
      }
      : null,
    isNonEmptyValue(bankDetails.swiftBicCode)
      ? {
        key: "swiftBicCode",
        label: "SWIFT/BIC:",
        value: bankDetails.swiftBicCode,
      }
      : null,
    isNonEmptyValue(bankDetails.bankCountry)
      ? {
        key: "bankCountry",
        label: "Bank Country:",
        value: bankDetails.bankCountry,
      }
      : null,
  ]);
};

export const getPaypalRows = (
  invoiceDetails: IInvoiceDetails,
): IInvoicePreviewRowConfig[] => {
  if (!isNonEmptyValue(invoiceDetails.paypalEmail)) return [];

  return [
    {
      key: "paypalEmail",
      label: "Paypal Email:",
      value: invoiceDetails.paypalEmail,
      labelWeight: "medium",
    },
  ];
};

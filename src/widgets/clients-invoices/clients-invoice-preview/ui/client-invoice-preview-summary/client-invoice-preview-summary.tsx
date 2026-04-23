import React from "react";
import { InvoiceRow } from "@/widgets/clients-invoices/clients-invoice-preview/ui/invoice-row/invoice-row.tsx";

import { formatCurrency } from "@/shared/libs/format/format-currency.ts";

interface ClientInvoicePreviewSummaryProps {
  campaignName: string
  amount: number
  className?: string
}

export const ClientInvoicePreviewSummary: React.FC<ClientInvoicePreviewSummaryProps> = ({
  campaignName,
  amount,
  className,
}) => {
  return (
    <div className={className}>
      <InvoiceRow
        label="Description:"
        value={`${campaignName} campaign`}
        labelWeight="medium"
      />

      <InvoiceRow
        label="Total:"
        value={formatCurrency(amount, "EUR")}
        labelWeight="medium"
      />

      <InvoiceRow
        label="Subtotal:"
        value={formatCurrency(amount, "EUR")}
        labelWeight="medium"
      />

      <InvoiceRow
        label="Balance DUE:"
        value={formatCurrency(amount, "EUR")}
        labelWeight="medium"
      />
    </div>
  );
};

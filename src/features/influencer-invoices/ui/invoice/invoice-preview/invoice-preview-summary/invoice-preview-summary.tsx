import React from 'react';
import { InvoiceRow } from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-row/invoice-row.tsx";
import { getSummaryRows } from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-preview.config.ts";
import { formatCurrency } from "@/shared/libs/format/format-currency.ts";
import type { IInvoiceDetails } from "@/entities/influencer-invoices/model/influencer-invoices.types.ts";

interface InvoicePreviewSummaryProps {
  invoiceDetails: IInvoiceDetails;

  sectionClassName: string;
}

export const InvoicePreviewSummary: React.FC<InvoicePreviewSummaryProps> = ({
  invoiceDetails,
  sectionClassName,
}) => {
  const summaryRows = getSummaryRows(invoiceDetails, formatCurrency);

  return (
    <div className={sectionClassName}>
      {summaryRows.map((row) => (
        <InvoiceRow
          key={row.key}
          label={row.label}
          value={row.value}
          labelWeight={row.labelWeight}
        />
      ))}
    </div>
  );
};

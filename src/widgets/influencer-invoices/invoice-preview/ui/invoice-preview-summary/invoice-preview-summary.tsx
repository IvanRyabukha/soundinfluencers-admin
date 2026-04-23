import React from 'react';
import { InvoiceRow } from "@/widgets/influencer-invoices/invoice-preview/ui/invoice-row/invoice-row.tsx";
import { getSummaryRows } from "@/widgets/influencer-invoices/invoice-preview/model/invoice-preview.config.ts";
import { formatCurrency } from "@/shared/libs/format/format-currency.ts";

import type { IInvoiceDetails } from "@/entities/invoices/model/influencer-invoices.types.ts";

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

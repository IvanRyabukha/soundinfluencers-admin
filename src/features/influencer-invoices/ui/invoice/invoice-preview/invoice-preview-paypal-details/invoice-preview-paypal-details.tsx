import React from 'react';
import { InvoiceRow } from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-row/invoice-row.tsx";
import { getPaypalRows } from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-preview.config.ts";
import type { IInvoiceDetails } from "@/entities/influencer-invoices/model/influencer-invoices.types.ts";

interface InvoicePreviewPaypalDetailsProps {
  invoiceDetails: IInvoiceDetails;
}

export const InvoicePreviewPaypalDetails: React.FC<InvoicePreviewPaypalDetailsProps> = ({
  invoiceDetails,
}) => {
  const paypalRows = getPaypalRows(invoiceDetails);

  return (
    <>
      {paypalRows.length > 0 && (
        <>
          {paypalRows.map((row) => (
            <InvoiceRow
              key={row.key}
              label={row.label}
              value={row.value}
              labelWeight={row.labelWeight}
            />
          ))
          }
        </>
      )}
    </>
  );
};

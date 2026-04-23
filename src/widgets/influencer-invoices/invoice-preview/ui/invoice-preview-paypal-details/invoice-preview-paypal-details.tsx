import React from 'react';
import { InvoiceRow } from "@/widgets/influencer-invoices/invoice-preview/ui/invoice-row/invoice-row.tsx";
import { getPaypalRows } from "@/widgets/influencer-invoices/invoice-preview/model/invoice-preview.config.ts";

import type { IInvoiceDetails } from "@/entities/invoices/model/influencer-invoices.types.ts";

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

import React from 'react';
import { InvoiceRow } from "@/widgets/influencer-invoices/invoice-preview/ui/invoice-row/invoice-row.tsx";
import { getBankDetailsRows } from "@/widgets/influencer-invoices/invoice-preview/model/invoice-preview.config.ts";

import type { IInvoiceDetails } from "@/entities/invoices/model/influencer-invoices.types.ts";

interface InvoicePreviewBankDetailsProps {
  invoiceDetails: IInvoiceDetails;

  sectionClassName?: string;
}

export const InvoicePreviewBankDetails: React.FC<InvoicePreviewBankDetailsProps> = ({
  invoiceDetails,
  sectionClassName,
}) => {

  const bankDetailsRows = getBankDetailsRows(invoiceDetails);

  return (
    <>
      {
        bankDetailsRows.length > 0 && (
          <div className={sectionClassName}>
            {bankDetailsRows.map((row) => (
              <InvoiceRow
                key={row.key}
                label={row.label}
                value={row.value}
              />
            ))}
          </div>
        )
      }
    </>
  );
};

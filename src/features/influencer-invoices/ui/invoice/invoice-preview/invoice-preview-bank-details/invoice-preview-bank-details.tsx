import React from 'react';
import { InvoiceRow } from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-row/invoice-row.tsx";
import {
  getBankDetailsRows,
} from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-preview.config.ts";
import type { IInvoiceDetails } from "@/entities/influencer-invoices/model/influencer-invoices.types.ts";

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

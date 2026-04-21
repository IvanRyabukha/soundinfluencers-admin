import React from 'react';
import { InvoiceRow } from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-row/invoice-row.tsx";
import { getBillToRows } from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-preview.config.ts";
import type { IInvoiceDetails } from "@/entities/influencer-invoices/model/influencer-invoices.types.ts";

interface InvoicePreviewBillToProps {
  invoiceDetails: IInvoiceDetails;

  sectionClassName?: string;
}

export const InvoicePreviewBillTo: React.FC<InvoicePreviewBillToProps> = ({
  invoiceDetails,
  sectionClassName,
}) => {
  const billToRows = getBillToRows(invoiceDetails);

  return (
    <>
      <InvoiceRow
        label="Bill to:"
        value={invoiceDetails.billTo.companyName}
        labelWeight="medium"
      />

      <div className={sectionClassName}>
        {billToRows.map((row) => (
          <InvoiceRow
            key={row.key}
            label={row.label}
            value={row.value}
          />
        ))}
      </div>
    </>
  );
};

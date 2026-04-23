import React from 'react';
import { InvoiceRow } from "@/widgets/influencer-invoices/invoice-preview/ui/invoice-row/invoice-row.tsx";
import { getBillToRows } from "@/widgets/influencer-invoices/invoice-preview/model/invoice-preview.config.ts";

import type { IInvoiceDetails } from "@/entities/invoices/model/influencer-invoices.types.ts";

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

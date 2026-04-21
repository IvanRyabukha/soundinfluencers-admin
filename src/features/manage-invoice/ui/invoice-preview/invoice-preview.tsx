import React from "react";
import { InvoiceHeader } from "@/features/manage-invoice/ui/invoice-preview/invoice-header/invoice-header.tsx";
import { InvoiceParties } from "@/features/manage-invoice/ui/invoice-preview/invoice-parties/invoice-parties.tsx";
import { InvoiceBalance } from "@/features/manage-invoice/ui/invoice-preview/invoice-balance/invoice-balance.tsx";
import { PaymentInformation } from "@/features/manage-invoice/ui/invoice-preview/payment-information/payment-information.tsx";
import { InvoiceItemsTable } from "@/features/manage-invoice/ui/invoice-preview/invoice-items-table/invoice-items-table.tsx";
import type { IInvoice } from "@/entities/invoice/model/invoice.types.ts";

import s from './invoice-preview.module.scss';

interface InvoicePreviewProps {
  data: IInvoice;
  shortInvoiceNumber: number;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  data,
  shortInvoiceNumber,
}) => {
  return (
    <div className={s.layout}>

      <InvoiceHeader
        invoiceNumber={shortInvoiceNumber}
        date={data.creationDate}
      />

      <div className={s.content}>
        <InvoiceParties invoice={data} />

        <InvoiceBalance balance={data.amount} />

        <InvoiceItemsTable invoice={data} />

        <PaymentInformation />
      </div>
    </div>
  );
};

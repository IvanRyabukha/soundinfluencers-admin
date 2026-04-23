import React from "react";
import {
  ClientInvoicePreviewFrom,
  ClientInvoicePreviewHeader,
  ClientInvoicePreviewSummary,
  InvoiceRow
} from "@/widgets/clients-invoices/clients-invoice-preview";

import type { IClientInvoiceTableRowDto } from "@/entities/invoices/model/clients-invoices.types.ts";

import s from './client-invoice-preview.module.scss';

interface ClientInvoicePreviewProps {
  invoiceRow: IClientInvoiceTableRowDto;
}

export const ClientInvoicePreview: React.FC<ClientInvoicePreviewProps> = ({
  invoiceRow,
}) => {

  return (
    <div className={s.layout}>

      <ClientInvoicePreviewHeader
        invoiceId={invoiceRow.invoiceId}
        date={invoiceRow.date}
      />

      <div className={s.content}>

        <ClientInvoicePreviewFrom className={s.section}/>

        <InvoiceRow
          label="Bill to:"
          value={invoiceRow.company}
          labelWeight="medium"
        />

        <ClientInvoicePreviewSummary
          campaignName={invoiceRow.campaignName}
          amount={invoiceRow.amount}
          className={s.section}
        />

        <InvoiceRow
          label="Payment terms:"
          value="Within 7 business days"
          labelWeight="medium"
        />
      </div>
    </div>
  );
};

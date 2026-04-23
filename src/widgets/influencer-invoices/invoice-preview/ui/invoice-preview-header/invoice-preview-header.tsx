import React from 'react';
import type { IInvoiceDetails } from "@/entities/invoices/model/influencer-invoices.types.ts";

import s from './invoice-preview-header.module.scss';

interface InvoicePreviewHeaderProps {
  invoiceDetails: IInvoiceDetails;
}

export const InvoicePreviewHeader: React.FC<InvoicePreviewHeaderProps> = ({
  invoiceDetails,
}) => {
  return (
    <div className={s.header}>

      <div className={s.column}>
        <span>{invoiceDetails.from.fullName}</span>
        <span>{invoiceDetails.from.addressLine1}</span>
        <span>{invoiceDetails.from.addressLine2}</span>

        <div>
          <span className={s.label}>Postcode: </span>
          {invoiceDetails.from.postcode}
        </div>
        <span>{invoiceDetails.from.contactName}</span>
      </div>

      <div className={s.column}>
        <div>
          <span className={s.label}>Date: </span>
          {invoiceDetails.date}
        </div>

        <div className={s.group}>
          <span className={s.label}>Invoice NO.:</span>
          {invoiceDetails.invoiceNo}
        </div>
      </div>

    </div>
  );
};

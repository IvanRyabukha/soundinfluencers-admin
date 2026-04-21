import React from 'react';
import { InvoiceRow } from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-row/invoice-row.tsx";
import {
  PAYMENT_METHOD_LABELS,
} from "@/widgets/influencer-history/influencer-history-detail-table/model/influencer-history-details-table.helper.ts";
import {
  InvoicePreviewHeader,
} from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-preview-header/invoice-preview-header.tsx";
import {
  InvoicePreviewBillTo,
} from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-preview-bill-to/invoice-preview-bill-to.tsx";
import {
  InvoicePreviewSummary,
} from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-preview-summary/invoice-preview-summary.tsx";
import {
  InvoicePreviewBankDetails
} from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-preview-bank-details/invoice-preview-bank-details.tsx";
import {
  InvoicePreviewPaypalDetails
} from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-preview-paypal-details/invoice-preview-paypal-details.tsx";

import type { IInvoiceDetails } from "@/entities/influencer-invoices/model/influencer-invoices.types.ts";

import s from './invoice-preview.module.scss';

interface InvoicePreviewProps {
  invoiceDetails: IInvoiceDetails;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  invoiceDetails,
}) => {

  const paymentMethodLabel =
    PAYMENT_METHOD_LABELS[invoiceDetails.selectedPaymentMethod];

  return (
    <div className={s.layout}>

      <InvoicePreviewHeader invoiceDetails={invoiceDetails}/>

      <div className={s.content}>
        <InvoicePreviewBillTo invoiceDetails={invoiceDetails} sectionClassName={s.section}/>

        <InvoicePreviewSummary invoiceDetails={invoiceDetails} sectionClassName={s.section}/>

        <InvoiceRow
          label="Selected Payment Method:"
          value={paymentMethodLabel.toUpperCase()}
          labelWeight="medium"
        />

        <InvoicePreviewBankDetails invoiceDetails={invoiceDetails} sectionClassName={s.section}/>

        <InvoicePreviewPaypalDetails invoiceDetails={invoiceDetails}/>

        <InvoiceRow
          label="Payment terms:"
          value={invoiceDetails.paymentTerms}
          labelWeight="medium"
        />
      </div>
    </div>
  );
};

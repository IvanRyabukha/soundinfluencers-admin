import React from "react";
import { Modal } from "@/shared/ui/modal/modal.tsx";
import { InvoicePreview } from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-preview.tsx";
import type { IInvoiceDetails } from "@/entities/influencer-invoices/model/influencer-invoices.types.ts";

import close from "@/assets/icons/x.svg";

import s from './invoice-modal.module.scss';

interface InvoiceModalProps {
  invoiceDetails: IInvoiceDetails;
  invoiceId: string;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  invoiceDetails,
  invoiceId,
  onClose,
}) => {
  return (
    <Modal
      onClose={onClose}
      className={s.modal}
      contentClassName={s.content}
    >

      <h2 className={s.title}>Invoice</h2>

      <InvoicePreview
        invoiceDetails={invoiceDetails}
      />

      <button className={s.closeBtn} onClick={onClose}>
        <img
          className={s.closeIcon}
          src={close}
          alt="close"
          width={24}
          height={24}
        />
      </button>
    </Modal>
  )
}

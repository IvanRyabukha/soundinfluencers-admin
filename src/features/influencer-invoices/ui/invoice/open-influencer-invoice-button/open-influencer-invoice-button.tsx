import React, { useState } from "react";
import { InvoiceModal } from "@/features/influencer-invoices/ui/invoice/invoice-modal/invoice-modal.tsx";
import type { IInvoiceTableRowDto } from "@/entities/invoices/model/influencer-invoices.types.ts";

import eye from '@/assets/icons/eye.svg';

import s from './open-influencer-invoice-button.module.scss';

interface InfluencerInvoiceButton {
  invoiceId: string;
  invoiceRow: IInvoiceTableRowDto;
}

export const OpenInfluencerInvoiceButton: React.FC<InfluencerInvoiceButton> = ({
  invoiceId,
  invoiceRow,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenInvoiceModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseInvoiceModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className={s.btn}
        onClick={handleOpenInvoiceModal}
      >
        <img
          className={s.icon}
          src={eye}
          alt="Invoice Preview"
          width={18}
          height={18}
        />
      </button>

      {isModalOpen && (
        <InvoiceModal
          invoiceId={invoiceId}
          invoiceRow={invoiceRow}
          onClose={handleCloseInvoiceModal}
        />
      )}
    </>
  );
};

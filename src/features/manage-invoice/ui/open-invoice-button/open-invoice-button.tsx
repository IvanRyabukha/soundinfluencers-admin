import React, { useState } from "react";
import { InvoiceModal } from "@/features/manage-invoice";

import s from './open-invoice-button.module.scss';

interface OpenInvoiceButtonProps {
  invoiceId: string;
  shortInvoiceNumber: number;
}

export const OpenInvoiceButton: React.FC<OpenInvoiceButtonProps> = ({
  invoiceId,
  shortInvoiceNumber,
}) => {
  const [isOpenInvoiceModal, setIsOpenInvoiceModal] = useState(false);

  const handleOpenInvoiceModal = () => {
    setIsOpenInvoiceModal(true);
  }

  const handleCloseInvoiceModal = () => {
    setIsOpenInvoiceModal(false);
  }

  return (
    <>
      <button
        className={s.btn}
        type="button"
        onClick={handleOpenInvoiceModal}
      >
        Edit
      </button>

      {isOpenInvoiceModal && (
        <InvoiceModal
          invoiceId={invoiceId}
          shortInvoiceNumber={shortInvoiceNumber}
          onClose={handleCloseInvoiceModal}
        />
      )}
    </>
  )
}

import React, { useState } from "react";
import { ClientInvoiceModal } from "@/features/clients-invoices";
import type { IClientInvoiceTableRowDto } from "@/entities/invoices/model/clients-invoices.types.ts";

import eye from '@/assets/icons/eye.svg';

import s from './open-client-invoice-button.module.scss';

interface ClientInvoiceButton {
  invoiceId: string;
  invoiceRow: IClientInvoiceTableRowDto;
}

export const OpenClientInvoiceButton: React.FC<ClientInvoiceButton> = ({
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
        <ClientInvoiceModal
          invoiceId={invoiceId}
          invoiceRow={invoiceRow}
          onClose={handleCloseInvoiceModal}
        />
      )}
    </>
  );
};

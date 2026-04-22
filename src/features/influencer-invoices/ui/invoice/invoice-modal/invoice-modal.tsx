import React, { useMemo } from "react";
import { Modal } from "@/shared/ui/modal/modal.tsx";
import { InvoicePreview } from "@/features/influencer-invoices/ui/invoice/invoice-preview/invoice-preview.tsx";
import { useInvoiceQuery } from "@/features/manage-invoice/model/use-invoice-query.ts";
import { normalizeInvoiceToPreview } from "@/features/influencer-invoices/model/influencer-invoces.mapper.ts";
import type { IInvoiceTableRowDto } from "@/entities/invoices/model/influencer-invoices.types.ts";

import close from "@/assets/icons/x.svg";

import s from './invoice-modal.module.scss';

interface InvoiceModalProps {
  invoiceRow: IInvoiceTableRowDto;
  invoiceId: string;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  invoiceRow,
  invoiceId,
  onClose,
}) => {

  const { data, isPending, isError } = useInvoiceQuery(invoiceId);

  const normalizeInvoiceDetails = useMemo(() => {
    if (!data) return;

    return normalizeInvoiceToPreview(invoiceRow, data);
  }, [invoiceRow, data]);

  return (
    <Modal
      onClose={onClose}
      className={s.modal}
      contentClassName={s.content}
    >

      <h2 className={s.title}>Invoice</h2>

      {isPending && <div>Loading...</div>}

      {isError && <div>Failed to load invoice.</div>}

      {normalizeInvoiceDetails && (
        <InvoicePreview
          invoiceDetails={normalizeInvoiceDetails}
        />
      )}

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

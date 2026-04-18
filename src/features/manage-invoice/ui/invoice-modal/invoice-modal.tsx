import React from "react";
import { useInvoiceQuery } from "@/features/manage-invoice/model/use-invoice-query.ts";
import { Modal } from "@/shared/ui/modal/modal.tsx";
import { InvoicePreview } from "@/features/manage-invoice";

import s from './invoice-modal.module.scss';

interface InvoiceModalProps {
  invoiceId: string;
  shortInvoiceNumber: number;
  onClose?: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  invoiceId,
  shortInvoiceNumber,
  onClose,
}) => {
  const { data, isPending, isError } = useInvoiceQuery(invoiceId);

  return (
    <Modal
      onClose={onClose}
      className={s.modal}
      contentClassName={s.content}
    >
      {isPending && <div>Loading...</div>}

      {isError && <div>Failed to load invoice.</div>}

      {data && <InvoicePreview data={data} shortInvoiceNumber={shortInvoiceNumber} />}
    </Modal>
  );
};

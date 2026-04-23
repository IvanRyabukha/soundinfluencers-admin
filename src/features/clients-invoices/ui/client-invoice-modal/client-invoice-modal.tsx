import React from "react";
import { Modal } from "@/shared/ui/modal/modal.tsx";
import { ClientInvoicePreview } from "@/widgets/clients-invoices/clients-invoice-preview";
import type { IClientInvoiceTableRowDto } from "@/entities/invoices/model/clients-invoices.types.ts";

import close from "@/assets/icons/x.svg";

import s from './client-invoice-modal.module.scss';

// import { useInvoiceQuery } from "@/features/manage-invoice/model/use-invoice-query.ts";
// import { normalizeInvoiceToPreview } from "@/features/influencer-invoices/model/influencer-invoces.mapper.ts";

interface InvoiceModalProps {
  invoiceRow: IClientInvoiceTableRowDto;
  invoiceId: string;
  onClose: () => void;
}

export const ClientInvoiceModal: React.FC<InvoiceModalProps> = ({
  invoiceRow,
  // invoiceId,
  onClose,
}) => {

  // const { data, isPending, isError } = useInvoiceQuery(invoiceId);

  // const normalizeInvoiceDetails = useMemo(() => {
  //   if (!data) return;
  //
  //   return normalizeInvoiceToPreview(invoiceRow, data);
  // }, [invoiceRow, data]);

  return (
    <Modal
      onClose={onClose}
      className={s.modal}
      contentClassName={s.content}
    >

      <h2 className={s.title}>Invoice</h2>

      {/*{isPending && <div>Loading...</div>}*/}

      {/*{isError && <div>Failed to load invoice.</div>}*/}

      <ClientInvoicePreview invoiceRow={invoiceRow} />

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
  );
};

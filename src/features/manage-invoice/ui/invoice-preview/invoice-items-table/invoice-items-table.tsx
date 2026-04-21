import React from "react";
import { EditableInvoiceField } from "@/features/manage-invoice/ui/editable-invoice-field/editable-invoice-field.tsx";
import type { IInvoice } from "@/entities/invoice/model/invoice.types.ts";
import { formatCompactNumber } from "@/shared/libs/format/format-compact-number.ts";

import clsx from "clsx";
import s from './invoice-items-table.module.scss';

interface InvoiceItemsTableProps {
  invoice: IInvoice;
}

export const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({ invoice }) => {
  return (
    <div className={s.wrapper}>

      <div className={s.body}>
        <div className={clsx(s.gridRow, s.headRow)}>
          <div className={s.headCell}>Item Description</div>
          <div className={s.headCell}>Project</div>
          <div className={s.headCell}>PO</div>
          <div className={s.headCell}>Reach</div>
          <div className={s.headCell}>Total</div>
        </div>

        <div className={s.list}>
          <div className={s.gridRow}>
            <div className={s.cell}>{"—"}</div>
            <div className={s.cell}>{invoice.campaignName || "—"}</div>
            <div className={clsx(s.cell)}>
              <EditableInvoiceField
                initialValue={invoice.poNumber}
                invoiceId={invoice.invoiceId}
                fieldKey="poNumber"
                inputClassName={s.input}
              />
            </div>
            <div className={s.cell}>
              {invoice.campaignFollowers ? formatCompactNumber(invoice.campaignFollowers) : "—"}
            </div>
            <div className={s.cell}>{invoice.amount ? `${String(invoice.amount)}€` : "—"}</div>
          </div>
        </div>

        <div className={s.footer}>
          <span>Total:</span>
          <span>{invoice.amount}€</span>
        </div>
      </div>

    </div>
  );
};

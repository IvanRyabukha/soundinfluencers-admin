import React from "react";
import { OpenInvoiceButton } from "@/features/manage-invoice";

import s from './campaign-invoice-cell.module.scss';

interface CampaignInvoiceProps {
  invoiceId: string;
  shortInvoiceNumber: number;
}

export const CampaignInvoiceCell: React.FC<CampaignInvoiceProps> = ({
  invoiceId,
  shortInvoiceNumber,
}) => {
  return (
    <div className={s.campaignInvoiceCell}>
      {invoiceId ? (
        <OpenInvoiceButton
          invoiceId={invoiceId}
          shortInvoiceNumber={shortInvoiceNumber}
        />
        ) : (
        <span className={s.text}>{"—"}</span>
      )}
    </div>
  );
};


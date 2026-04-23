import React from 'react';

import s from './client-invoice-preview-header.module.scss';

interface ClientInvoicePreviewHeaderProps {
  invoiceId: string;
  date: string;
}

export const ClientInvoicePreviewHeader: React.FC<ClientInvoicePreviewHeaderProps> = ({
  invoiceId,
  date,
}) => {
  return (
    <div className={s.header}>

      <div className={s.column}>
        <div>
          <span className={s.label}>Date: </span>
          {date}
        </div>

        <div className={s.group}>
          <span className={s.label}>Invoice NO.:</span>
          {invoiceId}
        </div>
      </div>

    </div>
  );
};

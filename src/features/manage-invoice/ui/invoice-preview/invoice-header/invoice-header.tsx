import React from "react";
import { invoiceFormatDate } from "@/features/manage-invoice/model/invoice-preview.libs.ts";

import soundinfluencers from '@/assets/icons/invoice/soundInfluencers.svg';
import vectorLogo from '@/assets/icons/invoice/vector-logo.svg';

import s from './invoice-header.module.scss';

interface InvoiceHeaderProps {
  invoiceNumber: number;
  date: string;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  invoiceNumber,
  date,
}) => {
  return (
    <div className={s.header}>
      <div className={s.logo}>
        <img
          className={s.vectorLogo}
          src={vectorLogo}
          alt={""}
          width={22}
          height={24}
        />

        <img
          className={s.soundInfluencers}
          src={soundinfluencers}
          alt={""}
          width={210}
          height={24}
        />
      </div>

      <div className={s.info}>
        <div className={s.invoiceNumber}>
          <span className={s.label}>Invoice</span>
          <span className={s.number}>No. {invoiceNumber}</span>
        </div>

        <div className={s.date}>{invoiceFormatDate(date)}</div>
      </div>
    </div>
  );
};



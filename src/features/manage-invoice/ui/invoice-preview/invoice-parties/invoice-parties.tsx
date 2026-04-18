import React from "react";
import clsx from "clsx";
import { STATIC_COMPANY_INFO } from "@/features/manage-invoice/model/invoice-preview.constants.ts";
import { toFields } from "@/features/manage-invoice/model/invoice-preview.config.tsx";
import type { IInvoice } from "@/entities/invoice/model/invoice.types.ts";

import s from './invoice-parties.module.scss';

interface InvoicePartiesProps {
  invoice: IInvoice;
}

export const InvoiceParties: React.FC<InvoicePartiesProps> = ({ invoice }) => {
  return (
    <div className={s.invoiceParties}>
      <div className={s.from}>
        <span className={s.title}>From:</span>

        <div className={s.list}>
          {STATIC_COMPANY_INFO.map((item, index) => {
            if (item.type === "text") {
              return (
                <span key={index} className={clsx(s.label, {
                  [s.blockTitle]: index === 0,
                })}
                >
                  {item.text}
                </span>
              );
            }

            return (
              <span key={index} className={s.contacts}>
                <div className={s.contactLabel}>
                  <img
                    src={item.icon}
                    className={s.icon}
                    alt=""
                    width={14}
                    height={14}
                  />
                  <span>{item.label}</span>
                </div>
                <span className={s.contact}>{item.value}</span>
              </span>
            );
          })}
        </div>
      </div>

      <div className={s.to}>
        <span className={s.title}>To:</span>

        <div className={clsx(s.list, s.listTo)}>
          {toFields.map((field) => {
            const value = invoice[field.key];

            return (
              <span key={field.key} className={clsx(s.label, {
                [s.blockTitle]: value === invoice.company,
              })}
              >
                {field.render ? field.render((invoice)) : null}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

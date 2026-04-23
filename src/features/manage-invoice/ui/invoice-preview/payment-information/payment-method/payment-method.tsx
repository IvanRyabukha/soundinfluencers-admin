import React from "react";
import clsx from "clsx";
import {
  STATIC_PAYMENT_METHODS,
  type TMethod,
} from "@/features/manage-invoice/model/invoice-preview.constants.ts";

import s from './payment-method.module.scss';

interface PaymentMethodProps {
  method: TMethod;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ method }) => {
  const { title, icon, fields } = STATIC_PAYMENT_METHODS[method];

  return (
    <div className={clsx({
      [s.bankTransferCard]: method === 'bankTransfer',
      [s.card]: method !== 'bankTransfer',
    })}>
      <div className={clsx({
        [s.bankTransferMethod]: method === 'bankTransfer',
        [s.method]: method !== 'bankTransfer',
      })}>
        <img
          className={clsx({
            [s.bankTransferIcon]: method === 'bankTransfer',
            [s.icon]: method !== 'bankTransfer',
          })}
          src={icon}
          alt={title}
          width={24}
          height={24}
        />
        <span>{title} details:</span>
      </div>

      <div className={s.info}>
        {fields.map((field) => (
          <div
            key={field.label}
            className={clsx({
              [s.bankTransferValue]: method === 'bankTransfer',
              [s.value]: method !== 'bankTransfer',
            })}
          >
            <span className={s.label}>{field.label}</span>
            <span className={s.text}>{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

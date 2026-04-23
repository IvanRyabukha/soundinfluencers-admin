import { PaymentCard } from "@/features/manage-invoice/ui/invoice-preview/payment-information/payment-card/payment-card.tsx";
import { PaymentMethod } from "@/features/manage-invoice/ui/invoice-preview/payment-information/payment-method/payment-method.tsx";
import { STATIC_PAYMENT_INFO_CARDS } from "@/features/manage-invoice/model/invoice-preview.constants.ts";

import s from './payment-information.module.scss';

export const PaymentInformation = () => {
  return (
    <div className={s.container}>

      <span className={s.title}>Payment Information</span>

      <div className={s.top}>
        <PaymentMethod method="bankTransfer"/>

        <div className={s.variants}>
          {STATIC_PAYMENT_INFO_CARDS.map((card) => (
            <PaymentCard
              key={card.title}
              title={card.title}
              fields={card.fields}
            />
          ))}
        </div>
      </div>

      <div className={s.bottom}>
        <PaymentMethod method="cardPayments"/>
        <PaymentMethod method="paypal"/>
      </div>
    </div>
  );
};

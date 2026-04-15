import React from "react";
import { BaseCurrencySelector, BasePriceInput } from "@/shared/ui";
import { useFormContext } from "react-hook-form";
import {
  PRICE_INPUT_LABELS,
  type TInfluencerAccountFormValues,
} from "@/widgets/influencers/influencer-account-form/model";
import clsx from "clsx";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

import s from './pricing-fields.module.scss';

interface PricingProps {
  platform: TSocialMediaValue;
}

export const PricingFields: React.FC<PricingProps> = ({ platform }) => {
  const { getFieldState, formState } = useFormContext<TInfluencerAccountFormValues>();
  const { error: priceError } = getFieldState("initialPrice", formState);

  return (
    <div className={s.pricingFields}>
      <label
        htmlFor={"initialPrice"}
        className={clsx(s.priceLabel, priceError && s.priceLabelError)}
      >
        {PRICE_INPUT_LABELS[platform] ?? ""}
      </label>

      <BaseCurrencySelector<TInfluencerAccountFormValues>
        name="currency"
      />
      <BasePriceInput<TInfluencerAccountFormValues>
        name="initialPrice"
        currencyName="currency"
        autoComplete="off"
      />
    </div>
  );
};

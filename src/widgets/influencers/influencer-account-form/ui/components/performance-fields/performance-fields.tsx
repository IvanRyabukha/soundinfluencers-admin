import { BaseNumericInput } from "@/shared/ui";
import type { TInfluencerAccountFormValues } from "@/widgets/influencers/influencer-account-form/model";

import s from './performance-fields.module.scss';

export const PerformanceFields = () => {
  return (
    <div className={s.performanceFields}>
      <BaseNumericInput<TInfluencerAccountFormValues>
        name="averageViews"
        label="Average views"
        placeholder="Enter average views"
        autoComplete="off"
        allowDecimal
      />
      <BaseNumericInput<TInfluencerAccountFormValues>
        name="engagementRate"
        label="Engagement rate"
        placeholder="Enter engagement rate"
        autoComplete="off"
        allowDecimal
      />
    </div>
  );
};

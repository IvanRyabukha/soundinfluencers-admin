import { BasePercentageInput } from "@/shared/ui/form-input/base-percentage-input/base-percentage-input.tsx";
import { BaseCountryAutocompleteField } from "@/shared/ui";
import { FormBlockHeader } from "@/widgets/influencers/influencer-account-form/ui/components/form-block-header";
import type { TInfluencerAccountFormValues } from "@/widgets/influencers/influencer-account-form/model";

import s from './audience-insights.module.scss';

export const AudienceInsights = () => {

  return (
    <div className={s.audienceInsights}>
      <FormBlockHeader
        title="Audience insights"
        subtitle="Enter the top 5 audience countries and their reach percentage"
      />

      <div className={s.fields}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={s.field}>

            <div className={s.label}>
              <span className={s.fieldLabel}>#{index + 1}</span>
            </div>

            <div className={s.inputs}>
              <div className={s.percentage}>
                <BasePercentageInput<TInfluencerAccountFormValues>
                  name={`countries.${index}.percentage`}
                  placeholder={`${Math.max(0, 25 - index * 5)}%`}
                  autoComplete="off"
                  className={s.percentageInput}
                />
              </div>

              <div className={s.country}>
                <BaseCountryAutocompleteField<TInfluencerAccountFormValues>
                  name={`countries.${index}.country`}
                  countriesName="countries"
                  placeholder="Find country"
                  index={index}
                />
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

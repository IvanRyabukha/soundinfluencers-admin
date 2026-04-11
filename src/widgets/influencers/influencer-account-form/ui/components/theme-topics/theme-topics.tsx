import React from "react";
import {
  THEME_TOPICS,
  type TInfluencerAccountFormValues,
} from "@/widgets/influencers/influencer-account-form/model";
import { FormBlockHeader } from "@/widgets/influencers/influencer-account-form/ui/components/form-block-header";

import s from './theme-topics.module.scss';
import { BaseCheckboxTreeField } from "@/shared/ui";

export const ThemeTopics: React.FC = () => {
  return (
    <div className={s.themeTopics}>
      <FormBlockHeader
        title="Theme topics"
        subtitle="Select this if the main core theme of the page (optional)"
      />


      <BaseCheckboxTreeField<TInfluencerAccountFormValues>
        name="themeTopics"
        options={THEME_TOPICS}
      />
    </div>
  );
};

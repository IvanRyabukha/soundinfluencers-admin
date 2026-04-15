import React from "react";
import { FormBlockHeader } from "@/widgets/influencers/influencer-account-form/ui/components/form-block-header";
import { BaseCheckboxTreeField } from "@/shared/ui";
import {
  CONTENT_FOCUS_OPTIONS,
  type TInfluencerAccountFormValues,
} from "@/widgets/influencers/influencer-account-form/model";

import s from './content-focus.module.scss';

export const ContentFocus: React.FC = () => {
  return (
    <div className={s.contentFocus}>
      <FormBlockHeader
        title="Music categories"
        subtitle="Select all the applicable"
      />

      <BaseCheckboxTreeField<TInfluencerAccountFormValues>
        name="contentFocus"
        options={CONTENT_FOCUS_OPTIONS}
        // variant="creator"
      />
    </div>
  );
};

// title="Content focus"

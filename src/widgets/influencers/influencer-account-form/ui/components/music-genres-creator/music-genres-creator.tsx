import React from "react";
import { FormBlockHeader } from "@/widgets/influencers/influencer-account-form/ui/components/form-block-header";
import {
  MUSIC_GENRES_CREATOR,
  type TInfluencerAccountFormValues,
} from "@/widgets/influencers/influencer-account-form/model";

import s from './music-genres-creator.module.scss';
import { BaseCheckboxTreeField } from "@/shared/ui";

export const MusicGenresCreator: React.FC = () => {
  return (
    <div className={s.musicGenresCreator}>
      <FormBlockHeader
        title="Entertainment categories"
        subtitle="Select all the applicable"
      />

      <BaseCheckboxTreeField<TInfluencerAccountFormValues>
        name="musicGenresCreator"
        options={MUSIC_GENRES_CREATOR}
        // variant="creator"
      />
    </div>
  );
};

// title="Music genres"

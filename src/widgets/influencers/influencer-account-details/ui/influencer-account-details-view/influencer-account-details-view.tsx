import React from "react";
import type { IInfluencerDetails } from "@/entities/influencers/model/influencers.types.ts";
import { INFLUENCER_ACCOUNT_DETAILS_FIELD } from "@/widgets/influencers/influencer-account-details";

import s from './influencer-account-details-view.module.scss';

interface InfluencerAccountDetailsViewProps {
  details: IInfluencerDetails;
}

export const InfluencerAccountDetailsView: React.FC<InfluencerAccountDetailsViewProps> = ({
  details,
}) => {

  return (
    <div className={s.view}>
      {INFLUENCER_ACCOUNT_DETAILS_FIELD.map((field) => {
        const value = details[field.key];

        return (
          <div className={s.row} key={String(field.key)}>
            <span className={s.label}>{field.label}</span>

            <span className={s.value}>
              {value || "N/A"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

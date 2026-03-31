import React, { useState } from "react";
import {
  InfluencerAccountDetailsEditForm,
  InfluencerAccountDetailsView,
} from "@/widgets/influencers/influencer-account-details";
import clsx from "clsx";

import type { IInfluencerDetails } from "@/pages/influencers/influencer-details-page/ui/influencer-details-page.tsx";

import edit from '@/assets/icons/influencers/edit.svg';
import s from './influencer-account-details.module.scss';

interface InfluencerAccountDetailsProps {
  details: IInfluencerDetails;
}

export const InfluencerAccountDetails: React.FC<InfluencerAccountDetailsProps> = ({
  details,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={s.influencerAccountDetails}>
      <div className={s.header}>
        <h2 className={s.title}>Account details</h2>
        <button
          type="button"
          className={s.editBtn}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          Edit
          <img
            className={s.editIcon}
            src={edit}
            alt={"Edit"}
            width={18}
            height={18}
          />
        </button>
      </div>

      {isEditing ? (
        <InfluencerAccountDetailsEditForm
          influencerId={details.influencerId}
          defaultValues={details}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <InfluencerAccountDetailsView
          details={details}
        />
      )}
    </div>
  );
};

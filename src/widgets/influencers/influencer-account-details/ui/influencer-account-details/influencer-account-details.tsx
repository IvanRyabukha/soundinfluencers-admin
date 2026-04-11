import React, { useMemo, useState } from "react";
import {
  InfluencerAccountDetailsEditForm,
  InfluencerAccountDetailsView,
} from "@/widgets/influencers/influencer-account-details";
import {
  mapInfluencerDetailsToFormValues
} from "@/widgets/influencers/influencer-account-details/model/influencer-account-details.mapper.ts";
import type { IInfluencerDetails } from "@/entities/influencers/model/influencers.types.ts";
import clsx from "clsx";

import edit from '@/assets/icons/influencers/edit.svg';
import s from './influencer-account-details.module.scss';

interface InfluencerAccountDetailsProps {
  influencerId: string;
  details: IInfluencerDetails;
}

export const InfluencerAccountDetails: React.FC<InfluencerAccountDetailsProps> = ({
  influencerId,
  details,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const defaultValues = useMemo(() => mapInfluencerDetailsToFormValues(details), [details]);

  return (
    <div className={s.influencerAccountDetails}>
      <div className={s.header}>
        <h2 className={s.title}>Account details</h2>
        <button
          type="button"
          className={clsx(
            s.editBtn,
            isEditing && s.active,
          )}
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
          influencerId={influencerId}
          defaultValues={defaultValues}
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

import React from "react";
import { Link } from "react-router-dom";
import type { TSocialAccountShort } from "@/entities/influencers/model/social-account.types.ts";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

import edit from '@/assets/icons/influencers/edit.svg';

import s from './social-account-row.module.scss';

interface SocialAccountRowProps {
  platform: TSocialMediaValue;
  account: TSocialAccountShort;
  index: number;
}

export const SocialAccountRow: React.FC<SocialAccountRowProps> = ({
  platform,
  account,
  index,
}) => {

  return (
    <div className={s.socialAccountRow}>
      <div className={s.accountInfo}>
        <span className={s.badge}>{index + 1}</span>
        <span className={s.username}>{account.username || ""}</span>
      </div>

      <Link
        className={s.editLink}
        to={`accounts/${platform}/${account.accountId}/edit`}
      >
        <img
          className={s.editIcon}
          src={edit}
          alt={'Edit account'}
          width={18}
          height={18}
        />
        Edit
      </Link>
    </div>
  );
};

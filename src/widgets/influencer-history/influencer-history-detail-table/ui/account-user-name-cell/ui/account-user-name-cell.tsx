import React from "react";
import { getSocialMediaIcon } from "@/shared/libs/get-social-media-icon.ts";
import { RefreshHistoryForOne } from "@/features/influencer-history/refresh-history-for-one";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

import s from './account-user-name-cell.module.scss';

interface AccountUsernameCellProps {
  username: string;
  socialMedia: TSocialMediaValue | null;
  actionId: string;
}

export const AccountUsernameCell: React.FC<AccountUsernameCellProps> = ({
  username,
  socialMedia,
  actionId,
}) => {
  const displayValue = username ? username : "—";
  return (
    <div
      className={s.accountUsernameCell}
      title={displayValue}
    >
      <RefreshHistoryForOne
        actionId={actionId}
      />
      <img
        className={s.icon}
        src={getSocialMediaIcon(socialMedia)}
        alt={socialMedia ?? "Social Media"}
        width={20}
        height={20}
      />
      <span className={s.text}>{displayValue}</span>
    </div>
  );
};

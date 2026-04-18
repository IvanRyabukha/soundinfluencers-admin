import React from "react";
import clsx from "clsx";

import s from './campaign-cell.module.scss';

interface CampaignCellProps {
  value: string | null;
  isStillInCampaign?: boolean | null;
}

export const CampaignCell: React.FC<CampaignCellProps> = ({
  value,
  isStillInCampaign,
}) => {
  const displayValue = value ? value.trim() : "—";

  return (
    <div
      className={clsx(s.campaignCell, !isStillInCampaign && s.isCampaign)}
      title={displayValue}
    >
      <span className={s.text}>{displayValue}</span>
    </div>
  );
};

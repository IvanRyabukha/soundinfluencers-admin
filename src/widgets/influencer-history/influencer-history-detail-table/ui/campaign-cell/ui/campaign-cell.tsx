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
      className={clsx(s.textCell, !isStillInCampaign && s.isCampaign)}
      title={displayValue}
    >
      <span>{displayValue}</span>
    </div>
  );
};

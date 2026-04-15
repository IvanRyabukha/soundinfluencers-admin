import React from "react";

import s from './campaign-text-cell.module.scss';

interface CampaignTextCellProps {
  value: string | number;
  className?: string;
}

export const CampaignTextCell: React.FC<CampaignTextCellProps> = ({ value, className = "" }) => {
  const displayValue = value ? value : "—";
  return (
    <div
      className={className}
      title={String(value)}
    >
      <span className={s.text}>{displayValue}</span>
    </div>
  );
};

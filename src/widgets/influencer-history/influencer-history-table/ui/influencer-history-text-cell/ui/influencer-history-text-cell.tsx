import React from "react";
import clsx from "clsx";

import s from './influencer-history-text-cell.module.scss';

interface InfluencerHistoryTextCellProps {
  value: string;
  className?: string;
}

export const InfluencerHistoryTextCell: React.FC<InfluencerHistoryTextCellProps> = ({
  value,
  className,
}) => {
  const displayValue = value ? value.trim() : '—';

  return (
    <div
      className={clsx(s.textCell, className)}
      title={displayValue}
    >
      <span>{displayValue}</span>
    </div>
  )
};

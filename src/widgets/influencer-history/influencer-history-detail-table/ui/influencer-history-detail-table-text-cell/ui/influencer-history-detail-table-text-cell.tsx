import React from "react";

import s from './influencer-history-detail-table-text-cell.module.scss';

interface InfluencerHistoryDetailTableTextCellProps {
  value: string | null;
}

export const InfluencerHistoryDetailTableTextCell: React.FC<InfluencerHistoryDetailTableTextCellProps> = ({
  value,
}) => {
  const displayValue = value ? value.trim() : "—";

  return (
    <div
      className={s.textCell}
      title={displayValue}
    >
      <span>{displayValue}</span>
    </div>
  );
};

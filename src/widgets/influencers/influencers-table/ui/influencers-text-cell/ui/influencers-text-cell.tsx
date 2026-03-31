import React from 'react';

import clsx from "clsx";

interface InfluencersTextCellProps {
  value: string | undefined;
  className?: string;
}

export const InfluencersTextCell: React.FC<InfluencersTextCellProps> = ({ value, className }) => {
  const displayValue = value ? value : "-";

  return (
    <div
      className={clsx(className)}
      title={displayValue}
    >
      <span>{displayValue}</span>
    </div>
  );
};

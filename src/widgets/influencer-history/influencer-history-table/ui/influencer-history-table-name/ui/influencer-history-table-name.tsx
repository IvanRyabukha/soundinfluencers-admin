import React from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";

interface InfluencerHistoryTableNameProps {
  influencerId: string;
  value: string;
  className?: string;
}

export const InfluencerHistoryTableName: React.FC<InfluencerHistoryTableNameProps> = ({
  influencerId,
  value,
  className,
}) => {
  const displayValue = value ? value.trim() : "—";

  return (
    <Link
      to={`/dashboard/influencer-history/${influencerId}`}
      className={clsx(className)}
      title={displayValue}
    >
      {displayValue}
    </Link>
  );
};

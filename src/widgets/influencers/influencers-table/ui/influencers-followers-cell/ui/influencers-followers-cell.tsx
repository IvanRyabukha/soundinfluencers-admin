import React from 'react';
import { formatCompactNumber } from "@/shared/libs/format/format-compact-number.ts";

import clsx from "clsx";

interface InfluencersFollowersCellProps {
  followers: number;
  className?: string;
}

export const InfluencersFollowersCell: React.FC<InfluencersFollowersCellProps> = ({ followers, className }) => {
  const displayValue = followers && followers > 0 ? formatCompactNumber(followers) : '—';

  return (
    <div
      className={clsx(className)}
      title={followers > 0 ? followers.toString() : 'No followers'}
    >
      <span>{displayValue}</span>
    </div>
  )
};

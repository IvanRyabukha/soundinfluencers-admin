import React from "react";
import { formatCompactNumber } from "@/shared/libs/format/format-compact-number.ts";

interface CampaignFollowersCellProps {
  value: number;
  className?: string;
}

export const CampaignFollowersCell: React.FC<CampaignFollowersCellProps> = ({ value, className = "" }) => {
  const displayValue = value && value > 0 ? formatCompactNumber(value) : '—';

  return (
    <div
      className={className}
      title={value > 0 ? value.toString() : 'No followers'}
    >
      <span>{displayValue}</span>
    </div>
  )
}

import React from "react";

interface CampaignPriceCellProps {
  value: number;
  className?: string;
}

export const CampaignPriceCell: React.FC<CampaignPriceCellProps> = ({
  value,
  className = ""
}) => {
  const displayValue = value && value > 0 ? `${value}\u20AC` : '-';

  return (
    <div className={className}>
      <span>{displayValue}</span>
    </div>
  )
};

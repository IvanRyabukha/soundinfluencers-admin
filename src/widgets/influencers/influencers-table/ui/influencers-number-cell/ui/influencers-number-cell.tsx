import React from 'react';
import { formatCurrency } from "@/shared/libs/format/format-currency.ts";
import type { TCurrency } from "@/shared/types/types.ts";

interface InfluencersNumberCellProps {
  value: number;
  suffix?: TCurrency;
  className?: string;
}

export const InfluencersNumberCell: React.FC<InfluencersNumberCellProps> = ({ value, suffix, className }) => {
  const displayValue = suffix ?
    formatCurrency(value, suffix) : value ?
      `${value}` : '—';

  return (
    <div
      className={className}
      title={displayValue.toString()}
    >
      <span>{displayValue}</span>
    </div>
  );
};

import React from "react";
import clsx from "clsx";

import s from "./invoice-row.module.scss";

interface InvoiceRowProps {
  label: string;
  value: string;
  labelWeight?: 'default' | 'medium';
  className?: string;
}

export const InvoiceRow: React.FC<InvoiceRowProps> = ({
  label,
  value,
  className,
  labelWeight = 'default',
}) => {
  return (
    <div
      className={clsx(
        s.row,
        className,
      )}
    >
      <span className={clsx(
        labelWeight === 'medium' && s.labelMedium,
      )}>
        {label}
      </span>
      <span className={s.value}>{value}</span>
    </div>
  );
};

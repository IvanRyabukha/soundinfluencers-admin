import React from "react";
import s from "./invoice-placeholder-cell.module.scss";

interface InvoicePlaceholderCellProps {
  text?: string;
}

export const InvoicePlaceholderCell: React.FC<InvoicePlaceholderCellProps> = ({
  text = "Invoice",
}) => {
  return (
    <div className={s.invoice}>
      <span className={s.text}>{text}</span>
    </div>
  );
};

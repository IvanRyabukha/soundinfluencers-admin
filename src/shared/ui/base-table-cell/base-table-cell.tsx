import { forwardRef, type PropsWithChildren } from "react";
import clsx from "clsx";

import s from "./base-table-cell.module.scss";

interface BaseTableCellProps extends PropsWithChildren {
  className?: string;
}

export const BaseTableCell = forwardRef<HTMLDivElement, BaseTableCellProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={clsx(s.baseTableCell, className)}>
        {children}
      </div>
    );
  }
);

BaseTableCell.displayName = "BaseTableCell";

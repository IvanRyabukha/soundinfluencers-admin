import React, { useRef, useState } from "react";
import { useClickOutside } from "@/shared/hooks/use-click-outside.ts";
import { BaseTableCell } from "@/shared/ui";
import { ConfirmPaidStatus } from "@/features/influencer-invoices";

interface PaidStatusCellProps {
  status: boolean;
  className?: string;
}

export const PaidStatusCell: React.FC<PaidStatusCellProps> = ({ status, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <BaseTableCell ref={ref} className={className}>
      <ConfirmPaidStatus
        status={status}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
    </BaseTableCell>
  );
};

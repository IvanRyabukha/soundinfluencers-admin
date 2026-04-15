import React from "react";
import type { CampaignManagementRow } from "@/widgets/campaign-management/campaign-management-table/model/campaign-management-table.types";
import { useCampaignManagementStore } from "@/entities/campaign-managment/store/campaign-management.store";
import { DateCell } from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/cells/date-cell.tsx";

type Props = {
    row: CampaignManagementRow;
    canEdit: boolean;
};

export const DateTableCell: React.FC<Props> = ({ row, canEdit }) => {
    const setAccountDateRequest = useCampaignManagementStore(
        (s) => s.setAccountDateRequest,
    );

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <DateCell
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            canEdit={canEdit}
            selectedDate={row.dateMode}
            customDate={row.dateValue}
            setSelectedDate={(nextMode) => {
                if (nextMode === "BEFORE" || nextMode === "AFTER") {
                    const next = row.dateValue ? `${nextMode}:${row.dateValue}` : nextMode;
                    setAccountDateRequest(row.accountKey, next);
                    return;
                }

                setAccountDateRequest(row.accountKey, nextMode);
            }}
            setCustomDate={(nextDate) => {
                const mode =
                    row.dateMode === "BEFORE" || row.dateMode === "AFTER"
                        ? row.dateMode
                        : "BEFORE";

                setAccountDateRequest(row.accountKey, `${mode}:${nextDate}`);
            }}
        />
    );
};
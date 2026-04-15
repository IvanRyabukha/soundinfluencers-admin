import React from "react";
import type { CampaignManagementRow } from "@/widgets/campaign-management/campaign-management-table/model/campaign-management-table.types";
import { useCampaignManagementStore } from "@/entities/campaign-managment/store/campaign-management.store";
import { DescriptionCellEdit } from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/cells/description-cell-edit.tsx";
import { DescriptionCell } from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/cells/description-cell.tsx";

type Props = {
    row: CampaignManagementRow;
    canEdit: boolean;
};

export const DescriptionTableCell: React.FC<Props> = ({ row, canEdit }) => {
    const setAccountSelectedContent = useCampaignManagementStore(
        (s) => s.setAccountSelectedContent,
    );

    const [isOpen, setIsOpen] = React.useState(false);

    const setSelectedPd = (nextPd: number) => {
        const item = row.platformItems?.[row.selectedContentIndex];
        const desc = item?.descriptions?.[nextPd];
        if (!item || !desc) return;

        setAccountSelectedContent(row.accountKey, {
            campaignContentItemId: String(item._id ?? ""),
            descriptionId: String(desc._id ?? ""),
        });
    };

    if (canEdit) {
        return (
            <DescriptionCellEdit
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                platformItems={row.platformItems}
                selectedContent={row.selectedContentIndex}
                selectedPd={row.selectedDescriptionIndex}
                setSelectedPd={setSelectedPd}
                group={row.group}
                onSelectDescriptionId={(descriptionId) => {
                    const item = row.platformItems?.[row.selectedContentIndex];
                    if (!item) return;

                    setAccountSelectedContent(row.accountKey, {
                        campaignContentItemId: String(item._id ?? ""),
                        descriptionId: String(descriptionId ?? ""),
                    });
                }} onToggle={function (): void {
                throw new Error("Function not implemented.");
            }} onClose={function (): void {
                throw new Error("Function not implemented.");
            }}            />
        );
    }

    return (
        <DescriptionCell
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            platformItems={row.platformItems}
            selectedContent={row.selectedContentIndex}
            selectedPd={row.selectedDescriptionIndex}
            setSelectedPd={setSelectedPd}
            group={row.group} onToggle={function (): void {
            throw new Error("Function not implemented.");
        }} onClose={function (): void {
            throw new Error("Function not implemented.");
        }}        />
    );
};
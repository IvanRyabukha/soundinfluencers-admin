import React from "react";
import type { CampaignManagementRow } from "@/widgets/campaign-management/campaign-management-table/model/campaign-management-table.types";
import { useCampaignManagementStore } from "@/entities/campaign-managment/store/campaign-management.store";
import { ContentCellEdit } from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/cells/content-cell-edit.tsx";
import { ContentCell } from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/cells/content-cell.tsx";
import {
    PressContentCellEdit
} from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/cells/press-content-cell-edit.tsx";
import {
    PressContentCell
} from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/cells/press-content-cell.tsx";

type Props = {
    row: CampaignManagementRow;
    canEdit: boolean;
};

export const ContentTableCell: React.FC<Props> = ({ row, canEdit }) => {
    const setAccountSelectedContent = useCampaignManagementStore(
        (s) => s.setAccountSelectedContent,
    );

    const [isOpen, setIsOpen] = React.useState(false);

    const setSelectedContent = (
        nextIndex: number | ((prev: number) => number),
    ) => {
        const resolvedIndex =
            typeof nextIndex === "function"
                ? nextIndex(row.selectedContentIndex)
                : nextIndex;

        const nextItem = row.platformItems?.[resolvedIndex];
        const nextDesc = nextItem?.descriptions?.[0];

        if (!nextItem) return;

        setAccountSelectedContent(row.accountKey, {
            campaignContentItemId: String(nextItem._id ?? ""),
            descriptionId: String(nextDesc?._id ?? ""),
        });
    };

    const setSelectedPd = (nextPd: number) => {
        const item = row.platformItems?.[row.selectedContentIndex];
        const desc = item?.descriptions?.[nextPd];
        if (!item || !desc) return;

        setAccountSelectedContent(row.accountKey, {
            campaignContentItemId: String(item._id ?? ""),
            descriptionId: String(desc._id ?? ""),
        });
    };
    if (row.group === "press") {
        return canEdit ? (
            <PressContentCellEdit
                contentId={row.selectedItem?._id}
                value={row.selectedItem?.mainLink}
            />
        ) : (
            <PressContentCell value={row.selectedItem?.mainLink} />
        );
    }
    if (canEdit) {
        return (
            <ContentCellEdit
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                accountKey={row.accountKey}
                selectedItem={row.selectedItem}
                platformItems={row.platformItems}
                selectedContent={row.selectedContentIndex}
                setSelectedContent={setSelectedContent}
                setSelectedPd={setSelectedPd}
                socialMedia={row.account.socialMedia}
                media0={row.selectedItem?.mediaCache?.items?.[0]}
                group={row.group}
            />
        );
    }

    return (
        <ContentCell
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            platformItems={row.platformItems}
            selectedContent={row.selectedContentIndex}
            setSelectedContent={setSelectedContent}
            setSelectedPd={setSelectedPd}
            socialMedia={row.account.socialMedia}
            media0={row.selectedItem?.mediaCache?.items?.[0]}
            group={row.group}
        />
    );
};
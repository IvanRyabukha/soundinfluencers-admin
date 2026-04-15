import { useMemo } from "react";
import { useCampaignManagementStore } from "@/entities/campaign-managment/store/campaign-management.store";

export const useEditableContentItem = (contentId?: string, fallback?: any) => {
    const editableItem = useCampaignManagementStore((state) =>
        contentId
            ? state.editable?.campaignContent.find(
            (item) => String(item._id) === String(contentId),
        ) ?? null
            : null,
    );

    return useMemo(() => editableItem ?? fallback ?? null, [editableItem, fallback]);
};
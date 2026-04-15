import React from "react";
import { useCampaignManagementStore } from "@/entities/campaign-managment/store/campaign-management.store";

type Props = {
    contentId?: string;
    value?: string;
};

export const PressContentCellEdit: React.FC<Props> = ({
                                                          contentId,
                                                          value = "",
                                                      }) => {
    const setContentField = useCampaignManagementStore((s) => s.setContentField);

    if (!contentId) return <span>—</span>;

    return (
        <input
            value={value}
            onChange={(e) => setContentField(contentId, "mainLink", e.target.value)}
            placeholder="Paste press link"
        />
    );
};
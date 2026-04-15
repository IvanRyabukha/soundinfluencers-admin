

import { getAccountKey } from "@/entities/campaign-managment/store/campaign-management.store";
import { getGroupBySocial } from "@/entities/campaign-managment/model/campaign-management.helpers";

export const buildCampaignManagementRows = ({
                                                networks,
                                                items,
                                                group,
                                                optionIndex,
                                                changeView,
                                                canEdit,
                                            }: {
    networks: any[];
    items: any[];
    group: string;
    optionIndex: number;
    changeView: boolean;
    canEdit: boolean;
}) => {
    return (networks ?? []).map((account, index) => {
        const social = String(account?.socialMedia ?? "").toLowerCase();

        const platformItems =
            (items ?? []).filter(
                (item) => String(item?.socialMedia ?? "").toLowerCase() === social,
            ).length > 0
                ? (items ?? []).filter(
                    (item) => String(item?.socialMedia ?? "").toLowerCase() === social,
                )
                : (items ?? []).filter(
                    (item) =>
                        String(item?.socialMediaGroup ?? "") === getGroupBySocial(social),
                );

        const selected = account?.selectedCampaignContentItem ?? null;
        const selectedContentId = String(selected?.campaignContentItemId ?? "");
        const selectedDescriptionId = String(selected?.descriptionId ?? "");

        let selectedContentIndex = platformItems.findIndex(
            (item) => String(item?._id ?? "") === selectedContentId,
        );

        if (selectedContentIndex < 0) selectedContentIndex = 0;

        const selectedItem = platformItems[selectedContentIndex] ?? null;
        const descriptions = selectedItem?.descriptions ?? [];

        let selectedDescriptionIndex = descriptions.findIndex(
            (desc: any) => String(desc?._id ?? "") === selectedDescriptionId,
        );

        if (selectedDescriptionIndex < 0) selectedDescriptionIndex = 0;

        const dateRequestRaw = String(account?.dateRequest ?? "ASAP");
        const [dateMode, dateValue = ""] = dateRequestRaw.split(":");

        return {
            rowKey: `${account?.influencerId ?? account?.socialAccountId ?? index}-${index}`,
            optionIndex,
            group,
            changeView,
            canEdit,

            account,
            items,

            accountKey: getAccountKey(account),
            platformItems,
            selectedItem,
            selectedContentIndex,
            selectedDescriptionIndex,
            dateMode,
            dateValue,
        };
    });
};
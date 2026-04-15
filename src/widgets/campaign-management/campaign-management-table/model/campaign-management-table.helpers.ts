import { getAccountKey} from "@/entities/campaign-managment/store/campaign-management.store";
import { getGroupBySocial } from "@/entities/campaign-managment/model/campaign-management.helpers";
import type { TableGroup } from "@/entities/campaign-managment/model/campaign.managment";
import type {
    EditableAccount,
    EditableCampaignContentItem,
} from "@/entities/campaign-managment/store/campaign-management.store";
import type {CampaignManagementInsightRow, CampaignManagementRow} from "./campaign-management-table.types";

type Params = {
    networks: EditableAccount[];
    items: EditableCampaignContentItem[];
    group: TableGroup;
};

export const getPlatformItemsForAccount = ({
                                               account,
                                               items,
                                           }: {
    account: EditableAccount;
    items: EditableCampaignContentItem[];
}) => {
    const social = String(account.socialMedia ?? "").toLowerCase();

    const exact = (items ?? []).filter(
        (item) => String(item.socialMedia ?? "").toLowerCase() === social,
    );

    if (exact.length) return exact;

    const socialGroup = getGroupBySocial(social);

    return (items ?? []).filter(
        (item) => String(item.socialMediaGroup ?? "") === socialGroup,
    );
};

export const buildCampaignManagementRows = ({
                                                networks,
                                                items,
                                                group,
                                            }: Params): CampaignManagementRow[] => {
    return (networks ?? []).map((account) => {
        const platformItems = getPlatformItemsForAccount({ account, items });

        const selected =
            account.selectedCampaignContentItem ?? null;

        const selectedContentId = String(selected?.campaignContentItemId ?? "");
        const selectedDescriptionId = String(selected?.descriptionId ?? "");

        const selectedContentIndex = Math.max(
            0,
            platformItems.findIndex(
                (item) => String(item._id ?? "") === selectedContentId,
            ),
        );

        const selectedItem = platformItems[selectedContentIndex] ?? null;

        const descriptions = selectedItem?.descriptions ?? [];

        const selectedDescriptionIndex = Math.max(
            0,
            descriptions.findIndex(
                (desc) => String(desc._id ?? "") === selectedDescriptionId,
            ),
        );

        const selectedDescription =
            descriptions[selectedDescriptionIndex] ?? null;

        const dateRequestRaw = String(account.dateRequest ?? "ASAP");
        const [dateMode, dateValue = ""] = dateRequestRaw.split(":");

        return {
            account,
            group,
            accountKey: getAccountKey(account),

            platformItems,
            selectedContentIndex,
            selectedDescriptionIndex,

            selectedItem,
            selectedDescription,

            dateMode,
            dateValue,
        };
    });
};

export const buildCampaignManagementInsightRows = (
    networks: any[],
): CampaignManagementInsightRow[] => {
    return (networks ?? []).map((account) => ({
        accountKey: getAccountKey(account),
        account,
    }));
};

const PROMO_STATUS_BY_LABEL: Record<string, string> = {
    requested: "Requested",
    accepted: "Accepted",
    declined: "Declined",
    posted: "Posted",
    "insights submitted": "Insights Submitted",
    "n/a": "N/A",
    na: "N/A",
};

export const getPromoStatusLabel = (statusLabel?: string | null) => {
    if (!statusLabel) return "N/A";

    const normalized = statusLabel.trim().toLowerCase();
    return PROMO_STATUS_BY_LABEL[normalized] ?? statusLabel;
};
import type {
    CampaignAddedAccount,
    CampaignContentItem
} from "@/entities/campaign-managment/model/campaign.managment.ts";


const MAIN_NETWORKS = ["facebook", "instagram", "youtube", "tiktok"];
const MUSIC_NETWORKS = ["spotify", "soundcloud"];

export const getGroupBySocial = (
    social: string,
): "main" | "music" | "press" => {
    const s = social.toLowerCase();

    if (MAIN_NETWORKS.includes(s)) return "main";
    if (MUSIC_NETWORKS.includes(s)) return "music";
    return "press";
};

export const getAccountKey = (n: CampaignAddedAccount) =>
    String((n as any).addedAccountsId ?? (n as any).accountId);

export const getPlatformItemsForAccount = (
    account: CampaignAddedAccount,
    items: CampaignContentItem[],
) => {
    const social = String((account as any).socialMedia ?? "").toLowerCase();

    const socialItems = (items ?? []).filter(
        (it) => String((it as any).socialMedia ?? "").toLowerCase() === social,
    );

    if (socialItems.length) return socialItems;

    const socialGroup = getGroupBySocial(social);
    const groupItems = (items ?? []).filter(
        (it) => (it as any).socialMediaGroup === socialGroup,
    );

    if (social === "instagram") return groupItems;
    if (socialGroup === "main") return groupItems.slice(0, 1);

    return groupItems;
};

export const getSelectedMeta = (account: CampaignAddedAccount) => {
    return (
        (account as any)?.selectedContent ??
        (account as any)?.selectedCampaignContentItem ??
        null
    );
};

export const getResolvedSelectedContentIndex = (
    account: CampaignAddedAccount,
    platformItems: CampaignContentItem[],
) => {
    const selectedMeta = getSelectedMeta(account);
    const selectedContentId = String(selectedMeta?.campaignContentItemId ?? "");

    if (!selectedContentId) return 0;

    const index = platformItems.findIndex(
        (item: any) => String(item?._id ?? item?.id ?? "") === selectedContentId,
    );

    return index >= 0 ? index : 0;
};

export const getResolvedSelectedDescriptionIndex = (
    account: CampaignAddedAccount,
    platformItems: CampaignContentItem[],
    selectedContentIndex: number,
) => {
    const selectedMeta = getSelectedMeta(account);
    const selectedDescriptionId = String(selectedMeta?.descriptionId ?? "");

    const item = platformItems?.[selectedContentIndex];
    const descriptions = (item as any)?.descriptions ?? [];

    if (!selectedDescriptionId) return 0;

    const index = descriptions.findIndex(
        (desc: any) => String(desc?._id ?? "") === selectedDescriptionId,
    );

    return index >= 0 ? index : 0;
};
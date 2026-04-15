import type {
    TableGroup
} from "@/entities/campaign-managment/model/campaign.managment.ts";
import type {
    EditableAccount,
    EditableCampaignContentItem, EditableDescription
} from "@/entities/campaign-managment/store/campaign-management.store.ts";


// export type CampaignManagementRow = {
//     rowKey: string;
//     optionIndex: number;
//     group: TableGroup;
//     changeView: boolean;
//     canEdit: boolean;
//
//     account: AddedAccount;
//     items: CampaignContentItem[];
// };

export type CampaignManagementRow = {
    account: EditableAccount;
    group: TableGroup;
    accountKey: string;

    platformItems: EditableCampaignContentItem[];

    selectedContentIndex: number;
    selectedDescriptionIndex: number;

    selectedItem: EditableCampaignContentItem | null;
    selectedDescription: EditableDescription | null;

    dateMode: string;
    dateValue: string;
};
export type CampaignManagementInsightRow = {
    accountKey: string;
    account: EditableAccount & {
        postLink?: string | null;
        screenshot?: string | null;
        impressions?: number;
        like?: number;
        comments?: number;
        saves?: number;
        shares?: number;
    };
};
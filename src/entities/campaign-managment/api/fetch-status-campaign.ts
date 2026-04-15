import {$api} from "@/app/api/http.ts";
import type {CampaignStatus} from "@/entities/campaign-managment/model/campaign.managment.ts";

type apiProps = {
    status: CampaignStatus
    campaignId: string;
    optionIndex?: number
}


export const getCampaignByStatus = async ({status, campaignId, optionIndex}: apiProps) => {
    const res = await $api.get(
        `/admin/campaigns/${status}/${campaignId}`,
        {
            params: {
                optionIndex,
            },
        }
    );

    console.log(res.data, 'campaign-fetch');
    return res.data.data;
};
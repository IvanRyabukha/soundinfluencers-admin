import type {TableGroup} from "@/entities/campaign-managment/model/campaign.managment.ts";
import {getGroupBySocial} from "@/entities/campaign-managment/model/campaign-management.helpers.ts";

export const groupCampaignData = ({
                                      networks,
                                      items,
                                  }: {
    networks: any[];
    items: any[];
}) => {
    const groups: Record<TableGroup, { networks: any[]; items: any[] }> = {
        main: { networks: [], items: [] },
        music: { networks: [], items: [] },
        press: { networks: [], items: [] },
    };

    (networks ?? []).forEach((network) => {
        const group = getGroupBySocial(network?.socialMedia);
        groups[group].networks.push(network);
    });

    (items ?? []).forEach((item) => {
        const group = (item?.socialMediaGroup ?? "main") as TableGroup;

        if (groups[group]) {
            groups[group].items.push(item);
        }
    });

    return groups;
};
import type { TGetCampaignParams } from "@/entities/campaign/model/campaign.types.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { campaignsQueryKeys } from "@/entities/campaign/api/campaign.query-keys.ts";
import { getAllCampaigns } from "@/entities/campaign/api/campaign.api.ts";

export const useCampaignsQuery = (params: TGetCampaignParams)=> {
  return useQuery({
    queryKey: campaignsQueryKeys.list(params),
    queryFn: () => getAllCampaigns(params),
    staleTime: 0,
    placeholderData: keepPreviousData,
  });
};

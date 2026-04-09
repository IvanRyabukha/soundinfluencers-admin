import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCampaign } from "@/entities/campaign/api/campaign.api.ts";
import { campaignsQueryKeys } from "@/entities/campaign/api/campaign.query-keys.ts";
import type { ICampaignListPayload } from "@/entities/campaign";

export const useUpdateCampaignMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCampaign,
    onSuccess: (updatedCampaignDto) => {
      queryClient.setQueriesData(
        { queryKey: campaignsQueryKeys.lists() },
        (oldData: ICampaignListPayload | undefined) => {
          if (!oldData) return;

          // console.log(`Old campaign data before update:`, oldData.items.find(c => c.campaignId === updatedCampaignDto.campaignId));
          // console.log(`Updating campaign in cache with ID: ${updatedCampaignDto.campaignId}`, updatedCampaignDto);

          return {
            ...oldData,
            items: oldData.items.map(campaign =>
              campaign.campaignId === updatedCampaignDto.campaignId ? {
                ...campaign,
                ...updatedCampaignDto,
              } : campaign,
            ),
          };
        },
      )
    },
  });
};

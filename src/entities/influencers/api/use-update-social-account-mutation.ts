import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  updateSocialAccount } from "@/entities/influencers/api/influencers.api.ts";
import { influencersQueryKeys } from "@/entities/influencers/api/influencers.query-keys.ts";
import type { IInfluencerAccountListPayload } from "@/entities/influencers/model/influencers.types.ts";

export const useUpdateSocialAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSocialAccount,
    onSuccess: (updatedInfluencerAccountDto) => {
      queryClient.setQueriesData(
        { queryKey: influencersQueryKeys.lists() },
        (oldData: IInfluencerAccountListPayload | undefined) => {
          if (!oldData) return;

          // console.log(`Old campaign data before update:`, oldData.items.find(c => c.campaignId === updatedCampaignDto.campaignId));
          // console.log(`Updating campaign in cache with ID: ${updatedCampaignDto.campaignId}`, updatedCampaignDto);

          return {
            ...oldData,
            items: oldData.items.map(account =>
              account.accountId === updatedInfluencerAccountDto.accountId ? updatedInfluencerAccountDto : account,
            ),
          };
        },
      )
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateListInfluencer } from "@/entities/influencers/api/influencers.api.ts";
import type { IInfluencersListPayload } from "@/entities/influencers/model/influencers-list.types.ts";
import { influencersQueryKeys } from "@/entities/influencers/api/influencers.query-keys.ts";

export const useUpdateListInfluencerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateListInfluencer,
    onSuccess: (updatedInfluencerAccountDto) => {
      queryClient.setQueriesData(
        { queryKey: influencersQueryKeys.lists() },
        (oldData: IInfluencersListPayload | undefined) => {
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCampaign } from "@/entities/campaign/api/campaign.api.ts";
import { campaignsQueryKeys } from "@/entities/campaign/api/campaign.query-keys.ts";

export const useDeleteCampaignMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCampaign,
    onSuccess: async () => {
     await queryClient.invalidateQueries({
        queryKey: campaignsQueryKeys.lists(),
      });
    },
  });
};

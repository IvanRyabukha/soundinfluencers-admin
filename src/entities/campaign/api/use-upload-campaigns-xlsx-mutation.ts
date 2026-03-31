import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadCampaignsXlsx } from "@/entities/campaign/api/campaign.api.ts";
import { campaignsQueryKeys } from "@/entities/campaign/api/campaign.query-keys.ts";

export const useUploadCampaignsXlsxMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadCampaignsXlsx,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: campaignsQueryKeys.lists(),
      })
    },
  });
};

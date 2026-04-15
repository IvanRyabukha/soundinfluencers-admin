import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadInfluencersXlsx } from "@/entities/influencers/api/influencers.api.ts";
import { influencersQueryKeys } from "@/entities/influencers/api/influencers.query-keys.ts";
import type { UploadInfluencersListXlsxParams } from "@/entities/influencers/model/influencers-list.types.ts";

export const useUploadInfluencersXlsxMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UploadInfluencersListXlsxParams>({
    mutationFn: uploadInfluencersXlsx,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: influencersQueryKeys.lists(),
      })
    },
  });
};

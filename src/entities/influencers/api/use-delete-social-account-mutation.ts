import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSocialAccount } from "@/entities/influencers/api/influencers.api.ts";
import { influencersQueryKeys } from "@/entities/influencers/api/influencers.query-keys.ts";
import type { TDeleteSocialAccountParams } from "@/entities/influencers/model/social-account.types.ts";

export const useDeleteSocialAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: TDeleteSocialAccountParams) => deleteSocialAccount(params),

    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: influencersQueryKeys.lists(),
      });

      void queryClient.invalidateQueries({
        queryKey: influencersQueryKeys.detail(variables.influencerId),
      });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSocialAccount } from "@/entities/influencers/api/influencers.api.ts";
import { influencersQueryKeys } from "@/entities/influencers/api/influencers.query-keys.ts";

export const useUpdateSocialAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSocialAccount,
    onSuccess: (variables) => {
      void queryClient.invalidateQueries({
        queryKey: influencersQueryKeys.lists(),
      });

      void queryClient.invalidateQueries({
        queryKey: influencersQueryKeys.detail(variables.influencerId),
      });
    },
  });
};

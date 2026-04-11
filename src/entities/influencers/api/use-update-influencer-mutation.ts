import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInfluencerDetails } from "@/entities/influencers/api/influencers.api.ts";
import { influencersQueryKeys } from "@/entities/influencers/api/influencers.query-keys.ts";
import type { IInfluencerDetails } from "@/entities/influencers/model/influencers.types.ts";

export const useUpdateInfluencerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInfluencerDetails,
    onSuccess: (updatedInfluencer, variables) => {
      queryClient.setQueryData(
        influencersQueryKeys.detail(variables.influencerId),
        (oldData: IInfluencerDetails | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            ...updatedInfluencer,
          };
        },
      );

      void queryClient.invalidateQueries({
        queryKey: influencersQueryKeys.lists(),
      });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInfluencerDetails } from "@/entities/influencers/api/influencers.api.ts";
import { influencerHistoryQueryKeys } from "@/entities/influencer-history/api/influencer-history.query-keys.ts";
import type {
  IInfluencerHistoryDetailPayload,
} from "@/entities/influencer-history/model/influencer-history-detail.types.ts";

interface UpdateInfluencerCurrencyNoteMutationParams {
  influencerId: string;
  currencyNote: string;
}

export const useUpdateInfluencerCurrencyNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ influencerId, currencyNote }: UpdateInfluencerCurrencyNoteMutationParams) =>
      updateInfluencerDetails({
        influencerId,
        dto: { currencyNote },
      }),

    onSuccess: (_response, variables) => {
      queryClient.setQueriesData(
        {
          queryKey: influencerHistoryQueryKeys.detail(variables.influencerId),
        },
        (prevData: IInfluencerHistoryDetailPayload | undefined) => {
          if (!prevData) return prevData;

          return {
            ...prevData,
            history: {
              ...prevData.history,
              currencyNote: variables.currencyNote,
            },
          };
        },
      );
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkSocialAccountInCampaign } from "@/entities/influencer-history/api/influencer-history.api.ts";
import { influencerHistoryQueryKeys } from "@/entities/influencer-history/api/influencer-history.query-keys.ts";
import type {
  IInfluencerHistoryDetailPayload
} from "@/entities/influencer-history/model/influencer-history-detail.types.ts";

interface CheckSocialAccountMutationParams {
  influencerId: string;
  actionId: string;
}

export const useCheckSocialAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ influencerId, actionId }: CheckSocialAccountMutationParams) =>
      checkSocialAccountInCampaign(influencerId, actionId),

    onSuccess: (response, variables) => {
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
              actions: prevData.history.actions.map((action) => {
                if (action.actionType !== "campaign") return action;
                if (action.actionId !== variables.actionId) return action;

                return {
                  ...action,
                  isStillInCampaign: response.data,
                };
              }),
            },
          };
        },
      );
    },
  });
};

import { useQuery, keepPreviousData  } from "@tanstack/react-query";
import { getInfluencerHistoryById } from "@/entities/influencer-history/api/influencer-history.api.ts";
import { influencerHistoryQueryKeys } from "@/entities/influencer-history/api/influencer-history.query-keys.ts";
import type { IGetInfluencerHistoryDetailsQueryParams } from "@/entities/influencer-history/model/influencer-history-detail.types.ts";

export const useInfluencersHistoryDetailQuery = (
  influencerId: string | undefined,
  params: IGetInfluencerHistoryDetailsQueryParams,
) => {
  return useQuery({
    queryKey: influencerHistoryQueryKeys.detailList(influencerId ?? "", params),
    queryFn: () => {
      if (!influencerId) {
        throw new Error("influencerId is required");
      }

      return getInfluencerHistoryById(influencerId, params);
    },
    enabled: !!influencerId,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });
}

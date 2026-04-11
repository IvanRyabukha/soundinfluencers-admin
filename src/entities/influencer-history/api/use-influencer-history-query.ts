import { useQuery, keepPreviousData  } from "@tanstack/react-query";
import { getInfluencerHistory } from "@/entities/influencer-history/api/influencer-history.api.ts";
import { influencerHistoryQueryKeys } from "@/entities/influencer-history/api/influencer-history.query-keys.ts";
import type { TGetInfluencerHistoryParams } from "@/entities/influencer-history/model/influencer-history.types.ts";

export const useInfluencerHistoryQuery = (params: TGetInfluencerHistoryParams) => {
  return useQuery({
    queryKey: influencerHistoryQueryKeys.list(params),
    queryFn: () => getInfluencerHistory(params),
    placeholderData: keepPreviousData,
    staleTime: 0,
  });
}

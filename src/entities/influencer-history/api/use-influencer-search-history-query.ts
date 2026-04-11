import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { influencerHistoryQueryKeys } from "@/entities/influencer-history/api/influencer-history.query-keys.ts";
import type {
  TGetInfluencerSearchHistoryParams,
} from "@/entities/influencer-history/model/influencer-history.types.ts";
import { getInfluencersBySearchQuery } from "@/entities/influencer-history/api/influencer-history.api.ts";

export const useInfluencerSearchHistoryQuery = (params: TGetInfluencerSearchHistoryParams) => {
  const search = params.search.trim();

  return useQuery({
    queryKey: influencerHistoryQueryKeys.search({
      ...params,
      search,
    }),
    queryFn: () =>
      getInfluencersBySearchQuery({
        ...params,
        search,
      }),
    enabled: !!search,
    placeholderData: keepPreviousData,
    staleTime: 0,
  });
}

import { useQuery, keepPreviousData  } from "@tanstack/react-query";
import type { TGetInfluencerAccountParams } from "@/entities/influencers/model/influencers.types.ts";
import { influencersQueryKeys } from "@/entities/influencers/api/influencers.query-keys.ts";
import { getInfluencers } from "@/entities/influencers/api/influencers.api.ts";

export const useInfluencersQuery = (params: TGetInfluencerAccountParams) => {
  return useQuery({
    queryKey: influencersQueryKeys.list(params),
    queryFn: () => getInfluencers(params),
    staleTime: 0,
    placeholderData: keepPreviousData,
  });
}

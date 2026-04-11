import { useQuery } from "@tanstack/react-query";
import { getInfluencerById } from "@/entities/influencers/api/influencers.api.ts";
import { influencersQueryKeys } from "@/entities/influencers/api/influencers.query-keys.ts";

export const useInfluencerQuery = (influencerId?: string) => {
  return useQuery({
    queryKey: influencersQueryKeys.detail(influencerId ?? ""),
    queryFn: () => getInfluencerById(influencerId as string),
    enabled: !!influencerId,
    staleTime: 60 * 1000,
  });
}

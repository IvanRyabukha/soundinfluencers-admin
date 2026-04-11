import type {
  IGetInfluencerHistoryDetailsQueryParams,
} from "@/entities/influencer-history/model/influencer-history-detail.types.ts";
import type {
  TGetInfluencerHistoryParams,
  TGetInfluencerSearchHistoryParams,
} from "@/entities/influencer-history/model/influencer-history.types.ts";

export const influencerHistoryQueryKeys = {
  all: ["influencer-history"] as const,

  lists: () => ["influencer-history", "list"] as const,

  list: (params: TGetInfluencerHistoryParams) =>
    ["influencer-history", "list", params] as const,

  details: () => ["influencer-history", "detail"] as const,

  detail: (influencerId: string) =>
    ["influencer-history", "detail", influencerId] as const,

  detailList: (
    influencerId: string,
    params: IGetInfluencerHistoryDetailsQueryParams,
  ) => ["influencer-history", "detail", influencerId, "list", params] as const,

  searches: () => ["influencer-history", "search"] as const,
  search: (params: TGetInfluencerSearchHistoryParams) =>
    ["influencer-history", "search", params] as const,
};

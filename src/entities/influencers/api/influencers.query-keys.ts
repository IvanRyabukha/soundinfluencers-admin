export const influencersQueryKeys = {
  all: ["influencers"] as const,

  list: <T>(params: T) => ["influencers", "list", params] as const,

  lists: () => ["influencers", "list"] as const,

  // detail: (id: string) => ["influencers", "detail", id] as const,
};

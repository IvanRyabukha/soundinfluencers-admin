export const campaignsQueryKeys = {
  all: ["campaigns"] as const,
  list: <T>(params: T) => ["campaigns", "list", params] as const,
  lists: () => ['campaigns', 'list'] as const,
};

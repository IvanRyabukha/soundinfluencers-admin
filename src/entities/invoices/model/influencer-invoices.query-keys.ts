export const influencersInvoicesQueryKeys = {
  all: ["influencers-invoices"] as const,

  lists: () => ["influencers-invoices", "list"] as const,
  list: <T>(params: T) => ["influencers-invoices", "list", params] as const,
};

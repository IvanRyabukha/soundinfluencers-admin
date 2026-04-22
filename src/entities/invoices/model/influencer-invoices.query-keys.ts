export const influencersInvoicesQueryKeys = {
  all: ["influencers-invoices"] as const,

  lists: () => ["influencers-invoices", "list"] as const,
  list: <T>(params: T) => ["influencers-invoices", "list", params] as const,
};

export const clientsInvoicesQueryKeys = {
  all: ["clients-invoices"] as const,

  lists: () => ["clients-invoices", "list"] as const,
  list: <T>(params: T) => ["clients-invoices", "list", params] as const,
};

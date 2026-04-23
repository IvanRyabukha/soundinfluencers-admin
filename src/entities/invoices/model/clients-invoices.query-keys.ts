export const clientsInvoicesQueryKeys = {
  all: ["clients-invoices"] as const,

  lists: () => ["clients-invoices", "list"] as const,
  list: <T>(params: T) => ["clients-invoices", "list", params] as const,
};

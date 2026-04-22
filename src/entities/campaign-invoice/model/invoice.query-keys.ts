export const invoiceQueryKeys = {
  all: ["invoice"] as const,
  details: () => ["invoice", "detail"] as const,
  detail: (invoiceId: string) => ["invoice", "detail", invoiceId] as const,
};

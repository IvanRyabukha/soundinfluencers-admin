export const clientsQueryKeys = {
  all: ["clients"] as const,

  list: <T>(params: T) => ["clients", "list", params] as const,

  lists: () => ["clients", "list"] as const,

  detail: (id: string) => ["clients", "detail", id] as const,
};

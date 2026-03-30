import { useQuery } from "@tanstack/react-query";
import { clientsQueryKeys } from "@/entities/client/api/client.query-keys.ts";
import { getClientById } from "@/entities/client/api/client.api.ts";

export const useClientQuery = (clientId?: string) => {
  return useQuery({
    queryKey: clientsQueryKeys.detail(clientId ?? ""),
    queryFn: () => getClientById(clientId as string),
    enabled: !!clientId,
    staleTime: 60 * 1000,
  });
}

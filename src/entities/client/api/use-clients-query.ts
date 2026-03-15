import { useQuery, keepPreviousData  } from "@tanstack/react-query";
import { clientsQueryKeys } from "@/entities/client/api/client.query-keys.ts";
import { getClients } from "@/entities/client/api/client.api.ts";
import type { TGetClientsParams } from "@/entities/client/model/client.types.ts";

export const useClientsQuery = (params: TGetClientsParams) => {
  return useQuery({
    queryKey: clientsQueryKeys.list(params),
    queryFn: () => getClients(params),
    staleTime: 0,
    placeholderData: keepPreviousData,
  });
}

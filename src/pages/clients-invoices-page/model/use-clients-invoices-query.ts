import { useQuery, keepPreviousData  } from "@tanstack/react-query";
import { getClientsInvoices } from "@/entities/invoices/api/get-invoices.ts";
import type { TGetClientsInvoicesParams } from "@/entities/invoices/model/clients-invoices.types.ts";
import { clientsInvoicesQueryKeys } from "@/entities/invoices/model/clients-invoices.query-keys.ts";

export const useClientsInvoicesQuery = (params: TGetClientsInvoicesParams) => {
  return useQuery({
    queryKey: clientsInvoicesQueryKeys.list(params),
    queryFn: () => getClientsInvoices(params),
    staleTime: 0,
    placeholderData: keepPreviousData,
  });
};

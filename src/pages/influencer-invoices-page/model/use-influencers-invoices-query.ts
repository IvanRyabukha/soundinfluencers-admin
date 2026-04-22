import { useQuery, keepPreviousData  } from "@tanstack/react-query";
import { getInfluencersInvoices } from "@/entities/invoices/api/get-invoices.ts";
import { influencersInvoicesQueryKeys } from "@/entities/invoices/model/influencer-invoices.query-keys.ts";
import type { TGetInfluencersInvoicesParams } from "@/entities/invoices/model/influencer-invoices.types.ts";

export const useInfluencersInvoicesQuery = (params: TGetInfluencersInvoicesParams) => {
  return useQuery({
    queryKey: influencersInvoicesQueryKeys.list(params),
    queryFn: () => getInfluencersInvoices(params),
    staleTime: 0,
    placeholderData: keepPreviousData,
  });
};

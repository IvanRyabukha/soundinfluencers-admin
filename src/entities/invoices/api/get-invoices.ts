import { $api } from "@/app/api/http.ts";
import type {
  IInfluencersInvoicesListResponse,
  TGetInfluencersInvoicesParams
} from "@/entities/invoices/model/influencer-invoices.types.ts";
import type {
  IClientsInvoicesListResponse,
  TGetClientsInvoicesParams,
} from "@/entities/invoices/model/clients-invoices.types.ts";

export const getInfluencersInvoices = async (params: TGetInfluencersInvoicesParams) => {
  console.log("Get Influencers Invoices", params);

  const { data } = await $api.get<IInfluencersInvoicesListResponse>(`/admin/invoices/influencer`, {
    params,
  });

  console.log('Successfully get Influencers Invoices', data);

  return data.data;
};


export const getClientsInvoices = async (params: TGetClientsInvoicesParams) => {
  console.log("Get Clients Invoices", params);

  const { data } = await $api.get<IClientsInvoicesListResponse>('/admin/invoices/client', {
    params,
  });

  console.log('Successfully get Clients Invoices', data);

  return data.data;
}

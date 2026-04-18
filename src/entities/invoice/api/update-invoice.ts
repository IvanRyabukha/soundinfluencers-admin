import { $api } from "@/app/api/http.ts";
import type { IUpdateInvoiceResponse, TUpdateInfluencerParams } from "@/entities/invoice/model/invoice.types.ts";

export const updateInvoiceById = async ({
  invoiceId,
  dto,
}: TUpdateInfluencerParams) => {
  console.log(`Updating invoice with ID: ${invoiceId} with data:`, dto);

  const { data } = await $api.patch<IUpdateInvoiceResponse>(`/invoice/${invoiceId}`, dto);

  console.log('Successfully updated invoice', data);

  return data.data;
};

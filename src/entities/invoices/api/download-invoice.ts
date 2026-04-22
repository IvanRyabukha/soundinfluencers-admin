import { $api } from "@/app/api/http.ts";

export const downloadInvoice = async (invoiceId: string) => {
  console.log("Download Invoice", invoiceId);

  const response = await $api.get(`/invoice/download/${invoiceId}`, {
    responseType: "blob",
  });

  console.log('Successfully downloaded Invoice', response.data);

  return response.data;
};

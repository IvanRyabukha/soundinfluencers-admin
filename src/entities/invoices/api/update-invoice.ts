import { $api } from "@/app/api/http.ts";

export const updateInvoiceById = async (invoiceId: string) => {
  console.log("Update Invoice...", invoiceId);

  await $api.patch(`/admin/invoices/mark-paid/${invoiceId}`);

  console.log('Successfully updated invoice');
};

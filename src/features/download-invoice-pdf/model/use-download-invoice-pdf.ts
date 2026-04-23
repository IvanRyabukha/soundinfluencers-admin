import { useMutation } from "@tanstack/react-query";
import { downloadInvoice } from "@/entities/invoices/api/download-invoice.ts";

const downloadBlobFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
};

export const useDownloadInvoiceMutation = () => {
  return useMutation({
    mutationFn: async (invoiceId: string) => {
      const blob = await downloadInvoice(invoiceId);
      return { blob, invoiceId };
    },
    onSuccess: ({ blob, invoiceId }) => {
      downloadBlobFile(blob, `invoice-${invoiceId}.pdf`);
    },
  });
};

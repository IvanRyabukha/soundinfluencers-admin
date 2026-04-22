import React from "react";
import { useDownloadInvoiceMutation } from "@/features/influencer-invoices/model/use-download-influencer-invoice.ts";
import { toast } from "react-toastify";

import download from '@/assets/icons/download.svg';

import s from './download-pdf.module.scss';

interface DownloadPdfProps {
  invoiceId: string;
}

export const DownloadPdf: React.FC<DownloadPdfProps> = ({
  invoiceId,
}) => {
  const { mutate, isPending } = useDownloadInvoiceMutation();

  const handleDownloadInvoice = () => {
    console.log("Initiating download for invoice ID:", invoiceId);
    mutate(invoiceId, {
      onSuccess: () => {
        toast("Invoice downloaded successfully!", {
          type: "success",
          position: "top-right",
          autoClose: 3000,
        });
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDownloadInvoice}
      className={s.btn}
      disabled={isPending}
    >
      <img
        src={download}
        alt="Download PDF"
        className={s.icon}
        width={18}
        height={18}
      />
    </button>
  );
};

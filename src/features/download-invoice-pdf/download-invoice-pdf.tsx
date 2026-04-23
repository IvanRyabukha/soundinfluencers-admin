import React from "react";
import { useDownloadInvoiceMutation } from "@/features/download-invoice-pdf/model/use-download-invoice-pdf.ts";
import { CircleLoader } from "@/shared/ui/circle-loader/circle-loader.tsx";

import download from '@/assets/icons/download.svg';

import s from './download-invoice-pdf.module.scss';

interface DownloadInvoicePdfProps {
  invoiceId: string;
}

export const DownloadInvoicePdf: React.FC<DownloadInvoicePdfProps> = ({
  invoiceId,
}) => {
  const { mutate, isPending } = useDownloadInvoiceMutation();

  const handleDownloadInvoice = () => {
    console.log("Initiating download for invoice ID:", invoiceId);
    mutate(invoiceId);
  };

  return (
    <button
      type="button"
      onClick={handleDownloadInvoice}
      className={s.btn}
      disabled={isPending}
    >
      {isPending ? (
        <CircleLoader/>
      ) : (
        <img
          src={download}
          alt="Download PDF"
          className={s.icon}
          width={18}
          height={18}
        />
      )}
    </button>
  );
};

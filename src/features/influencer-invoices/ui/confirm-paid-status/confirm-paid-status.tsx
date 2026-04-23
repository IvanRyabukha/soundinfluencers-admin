import React from "react";
import { useUpdateInvoiceMutation } from "@/features/influencer-invoices/model/use-update-influencer-invoices.ts";
import { toast } from "react-toastify";

import close from '@/assets/icons/x.svg';
import check from '@/assets/icons/check.svg';

import s from "./confirm-paid-status.module.scss";

interface ConfirmPaidStatusProps {
  invoiceId: string;
  status: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ConfirmPaidStatus: React.FC<ConfirmPaidStatusProps> = ({
  invoiceId,
  status,
  isOpen,
  onOpen,
  onClose,
}) => {

  const { mutate, isPending } = useUpdateInvoiceMutation();

  if (status) {
    return "Paid";
  }

  const handleUpdateStatus = () => {
    mutate(invoiceId, {
      onSuccess: () => {
        onClose();

        toast('Invoice status updated to Paid successfully', {
          type: "success",
          position: "top-right",
          autoClose: 3000,
        });
      },
    });
  }

  return (
    <>
      {isOpen ? (
        <>
          <button
            type="button"
            className={s.btn}
            onClick={handleUpdateStatus}
            disabled={isPending}
          >
            <img
              className={s.icon}
              src={check}
              alt={'Check'}
              width={16}
              height={16}
            />
          </button>

          <button
            className={s.btn}
            type="button"
            onClick={onClose}
          >
            <img
              className={s.icon}
              src={close}
              alt="Close"
              width={16}
              height={16}
            />
          </button>
        </>
      ) : (
        <button
          type="button"
          className={s.openConfirmingBtn}
          onClick={onOpen}
        >
          Yes
        </button>
      )}
    </>
  );
};

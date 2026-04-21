import React from "react";

import close from '@/assets/icons/x.svg';
import check from '@/assets/icons/check.svg';

import s from "./confirm-paid-status.module.scss";

interface ConfirmPaidStatusProps {
  status: boolean;
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const ConfirmPaidStatus: React.FC<ConfirmPaidStatusProps> = ({
  status,
  isOpen,
  onOpen,
  onClose,
}) => {

  if (status) {
    return "Paid";
  }

  return (
    <>
      {isOpen ? (
        <>
          <button
            type="button"
            className={s.btn}
            onClick={() => alert('Invoice status updated to Paid is not implemented yet')}
            // disabled={isPending}
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

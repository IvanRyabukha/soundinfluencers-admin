import { type PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "@/shared/hooks/use-click-outside.ts";
import { useLockBodyScroll } from "@/shared/hooks/use-lock-body-scroll.ts";

import close from './assets/x.svg';

import s from './modal.module.scss';

interface Props extends PropsWithChildren {
  onClose?: () => void;
}

export const Modal = ({
  onClose,
  children,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(true);

  useClickOutside(modalRef, () => {
    if (onClose) {
      onClose();
    }
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return createPortal(
    <div className={s.modal} aria-hidden={false}>
      <div className={s.content} ref={modalRef} role={'dialog'} aria-modal={true} tabIndex={-1}>
        {children}
        <img className={s.x} onClick={onClose} src={close} alt="Close modal" />
      </div>

    </div>,
    document.body,
  );
};

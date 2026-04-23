import React, { useMemo, useRef, useState } from "react";
import { useUpdateInvoiceMutation } from "@/features/manage-invoice/model/use-update-invoice-mutation.ts";
import { toast } from "react-toastify";
import type { TInvoiceEditableKey } from "@/entities/campaign-invoice/model/invoice.types.ts";
import clsx from "clsx";

import s from './editable-invoice-field.module.scss';

interface IEditableInvoiceFieldProps {
  invoiceId: string;
  initialValue: string;
  fieldKey: TInvoiceEditableKey;
  inputClassName?: string;
}

export const EditableInvoiceField: React.FC<IEditableInvoiceFieldProps> = ({
  invoiceId,
  initialValue,
  fieldKey,
  inputClassName,
}) => {
  const { mutate, isPending } = useUpdateInvoiceMutation();
  const [draft, setDraft] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const isTouchDevice = useMemo(
    () => window.matchMedia("(pointer: coarse)").matches,
    []
  );

  const normalizedInitialValue = initialValue ?? "";

  const openEditor = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setDraft(normalizedInitialValue)
    setIsEditing(true);
  };

  const handleCloseEditing = () => {
    setIsEditing(false);
    setDraft("");
  };

  const handleSave = () => {
    if (isPending) return;

    const nextValue = draft.trim();
    const prevValue = normalizedInitialValue.trim();

    if (nextValue === prevValue) {
      handleCloseEditing();
      return;
    }

    mutate(
      {
        invoiceId,
        dto: {
          [fieldKey]: draft,
        },
      },
      {
        onSuccess: () => {
          toast("Invoice saved", {
            type: "success",
            position: "top-right",
            autoClose: 3000,
          });
          handleCloseEditing();
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current?.blur();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      handleCloseEditing();
    }
  };

  const displayValue = normalizedInitialValue.trim() ? normalizedInitialValue : "—";

  return (
    <div
      className={s.root}
      onClick={isTouchDevice ? openEditor : undefined}
      onDoubleClick={!isTouchDevice ? openEditor : undefined}
    >
      {isEditing ? (
        <input
          id={fieldKey}
          ref={inputRef}
          className={clsx(s.textInput, inputClassName)}
          type="text"
          value={draft}
          placeholder=""
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          disabled={isPending}
          autoComplete="off"
          autoFocus
        />
      ) : (
        <span>{displayValue}</span>
      )}
    </div>
  );
};

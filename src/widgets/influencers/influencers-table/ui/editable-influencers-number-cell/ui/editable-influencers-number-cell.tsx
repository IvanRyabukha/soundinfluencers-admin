import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useClickOutside } from "@/shared/hooks/use-click-outside.ts";
import { useUpdateSocialAccountMutation } from "@/entities/influencers/api/use-update-social-account-mutation.ts";
import { formatCurrency } from "@/shared/libs/format/format-currency.ts";
import { TableFieldEditor } from "@/shared/ui/table-field-editor";
import { toast } from "react-toastify";
import type { TCurrency } from "@/shared/types/types.ts";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";
import clsx from "clsx";

import s from './editable-influencers-number-cell.module.scss';

export type TInfluencerEditableField = "price" | "publicPrice" | "initialPrice" | "balance";

interface EditableInfluencersNumberCellProps {
  influencerId: string;
  accountId: string;
  socialMedia: TSocialMediaValue;
  value: number;
  suffix?: TCurrency;
  className?: string;
  field: TInfluencerEditableField;
}

export const EditableInfluencersNumberCell: React.FC<EditableInfluencersNumberCellProps> = ({
  influencerId,
  accountId,
  socialMedia,
  value,
  suffix,
  className,
  field,
}) => {
  const { mutate, isPending } = useUpdateSocialAccountMutation();

  const [isEditing, setIsEditing] = useState(false);
  const numberCellRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isSubmittingRef = useRef(false);

  const displayValue =
    value === null || value === undefined
      ? "-"
      : suffix
        ? formatCurrency(value, suffix)
        : String(value);

  const isTouchDevice = useMemo(
    () => window.matchMedia("(pointer: coarse)").matches,
    []
  );

  useClickOutside(numberCellRef, () => {
    if (!isEditing) return;

    inputRef.current?.blur();
  });

  const openEditor = useCallback((event: React.SyntheticEvent) => {
    event.stopPropagation();
    setIsEditing(true);
  }, []);

  const handleCloseUpdate = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleUpdateInfluencer = (rawValue: string) => {
    if (isSubmittingRef.current) return;

    const trimmed = rawValue.trim();
    const initial = String(value ?? "").trim();

    if (trimmed === initial) {
      handleCloseUpdate();
      return;
    }

    if (!trimmed) {
      handleCloseUpdate();
      return;
    }

    const parsedValue = Number(trimmed);

    if (Number.isNaN(parsedValue)) {
      toast("Enter a valid number", {
        type: "warning",
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    mutate({
      influencerId,
      accountId,
      socialMedia,

    }, {
      onSuccess: () => {
        handleCloseUpdate();
        toast("Value updated successfully", {
          type: "success",
          position: "top-right",
          autoClose: 3000,
        });
      },
    })
  }

  return (
    <div
      ref={numberCellRef}
      className={clsx(className, s.numberCell)}
      onClick={isTouchDevice ? openEditor : undefined}
      onDoubleClick={!isTouchDevice ? openEditor : undefined}
    >
      {isEditing ? (
        <TableFieldEditor
          ref={inputRef}
          initialValue={value !== null && value !== undefined ? String(value) : ""}
          onSaveChange={handleUpdateInfluencer}
          isPending={isPending}
          onClose={handleCloseUpdate}
          inputId={field}
        />
      ) : (
        <span className={s.value}>{displayValue}</span>
      )
      }
    </div>
  );
};

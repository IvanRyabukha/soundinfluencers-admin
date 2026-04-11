import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useClickOutside } from "@/shared/hooks/use-click-outside.ts";
import { useUpdateListSocialAccountMutation } from "@/entities/influencers/api/use-update-list-social-account-mutation.ts";
import { useUpdateListInfluencerMutation } from "@/entities/influencers/api/use-update-list-influencer-mutation.ts";
import { formatCurrency } from "@/shared/libs/format/format-currency.ts";
import { TableFieldEditor } from "@/shared/ui/table-field-editor";
import { toast } from "react-toastify";
import type { TCurrency } from "@/shared/types/types.ts";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";
import clsx from "clsx";

import s from './editable-influencers-number-cell.module.scss';

type EditableInfluencersNumberCellProps =
  | {
  mode: "socialAccount";
  influencerId: string;
  accountId: string;
  socialMedia: TSocialMediaValue;
  value: number;
  suffix?: TCurrency;
  className?: string;
  field: "price" | "publicPrice";
}
  | {
  mode: "influencer";
  influencerId: string;
  accountId: string;
  value: number;
  suffix?: TCurrency;
  className?: string;
  field: "balance";
};

export const EditableInfluencersNumberCell: React.FC<EditableInfluencersNumberCellProps> = (props) => {
  const { mode, influencerId, accountId, value, suffix, className, field } = props;

  const {
    mutate: mutateSocialAccount,
    isPending: isSocialAccountPending,
  } = useUpdateListSocialAccountMutation();

  const {
    mutate: mutateInfluencer,
    isPending: isInfluencerPending,
  } = useUpdateListInfluencerMutation();

  const [isEditing, setIsEditing] = useState(false);
  const numberCellRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayValue =
    value === null || value === undefined
      ? "—"
      : suffix
        ? formatCurrency(value, suffix)
        : String(value);

  const isPending =
    mode === "socialAccount"
      ? isSocialAccountPending
      : isInfluencerPending;

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

  const handleSuccess = useCallback(() => {
    handleCloseUpdate();
    toast("Value updated successfully", {
      type: "success",
      position: "top-right",
      autoClose: 3000,
    });
  }, [handleCloseUpdate]);

  const handleSave= (rawValue: string) => {
    if (isPending) return;

    const trimmed = rawValue.trim();
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

    if (parsedValue === value) {
      handleCloseUpdate();
      return;
    }

    if (mode === "socialAccount") {
      mutateSocialAccount({
        influencerId,
        accountId,
        socialMedia: props.socialMedia,
        [field]: parsedValue,
      }, {
        onSuccess: handleSuccess,
      });
    } else {
      mutateInfluencer({
        influencerId,
        accountId,
        dto: {
          [field]: parsedValue,
        },
      }, {
        onSuccess: handleSuccess,
      });
    }
  };

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
          onSaveChange={handleSave}
          isPending={isPending}
          onClose={handleCloseUpdate}
          inputId={field}
        />
      ) : ( <span className={s.value}>{displayValue}</span> )}
    </div>
  );
};

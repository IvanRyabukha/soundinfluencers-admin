import React, { useCallback, useMemo, useRef, useState } from "react";
import { useUpdateCampaignMutation } from "@/entities/campaign/api/use-update-campaign-mutation.ts";
import { toast } from "react-toastify";
import { TableFieldEditor } from "@/shared/ui/table-field-editor";
import { useClickOutside } from "@/shared/hooks/use-click-outside.ts";
import type { TCampaignStatus } from "@/entities/campaign";

import clsx from "clsx";

import s from './campaign-affiliate-cell.module.scss';

export type TCampaignMetaKey = "affiliateCommission" | "affiliatePaid" | "affiliatePartner";

interface CampaignAffiliateCellProps {
  value: string;
  campaignId: string;
  status: TCampaignStatus;
  field: TCampaignMetaKey;

  className?: string;
}

export const CampaignAffiliateCell: React.FC<CampaignAffiliateCellProps> = ({
  value,
  campaignId,
  status,
  field,
  className = "",
}) => {
  const { mutate, isPending } = useUpdateCampaignMutation();

  const [isEditing, setIsEditing] = useState(false);
  const affiliateCellRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isSubmittingRef = useRef(false);

  const displayValue = value?.trim() ? value : "-";

  const isTouchDevice = useMemo(
    () => window.matchMedia("(pointer: coarse)").matches,
    []
  );

  useClickOutside(affiliateCellRef, () => {
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

  const handleUpdateCampaign = (rawValue: string) => {
    if (isSubmittingRef.current) return;

    const nextValue = rawValue.trim();
    const prevValue = value?.trim() ?? "";

    if (nextValue === prevValue) {
      handleCloseUpdate();
      return;
    }

    isSubmittingRef.current = true;

    mutate(
      {
        campaignId,
        status,
        dto: {
          [field]: nextValue,
        },
      },
      {
        onSuccess: () => {
          isSubmittingRef.current = false;
          handleCloseUpdate();
          toast("Campaign updated successfully", {
            type: "success",
            position: "top-right",
            autoClose: 3000,
          });
        },
        onError: () => {
          isSubmittingRef.current = false;
        },
      }
    );
  };

  return (
    <div
      ref={affiliateCellRef}
      className={clsx(className, s.affiliateCell)}
      onClick={isTouchDevice ? openEditor : undefined}
      onDoubleClick={!isTouchDevice ? openEditor : undefined}
    >
      {isEditing ? (
        <TableFieldEditor
          ref={inputRef}
          initialValue={value ?? ""}
          onSaveChange={handleUpdateCampaign}
          isPending={isPending}
          onClose={handleCloseUpdate}
          inputId={field}
        />
        ) : (
          <span className={s.cellValue}>{displayValue}</span>
        )
      }
    </div>
  );
};

import * as Popover from "@radix-ui/react-popover";
import React, { useCallback, useMemo, useState } from "react";
import { useUpdateCampaignMutation } from "@/entities/campaign/api/use-update-campaign-mutation.ts";
import { NotesEditor } from "@/shared/ui/notes-editor";
import { toast } from "react-toastify";
import type { TCampaignStatus } from "@/entities/campaign";

import clsx from "clsx";

import s from './campaign-note-cell.module.scss';

interface CampaignNoteCellProps {
  value: string;
  campaignId: string;
  status: TCampaignStatus;
  className?: string;
}

export const CampaignNoteCell: React.FC<CampaignNoteCellProps> = ({
  value,
  campaignId,
  status,
  className = "",
}) => {
  const { mutate, isPending } = useUpdateCampaignMutation();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const displayValue = value?.trim() ? value : "—";

  const isTouchDevice = useMemo(
    () => window.matchMedia("(pointer: coarse)").matches,
    []
  );

  const openEditor = useCallback((event: React.SyntheticEvent) => {
    event.stopPropagation();
    setIsEditorOpen(true);
  }, []);

  const handleCloseEditor = useCallback(() => {
    setIsEditorOpen(false);
  }, []);

  const handleSave = (nextNotes: string) => {
    const prevNotes = value?.trim() ?? "";
    const trimmedNotes = nextNotes.trim();

    if (trimmedNotes === prevNotes) {
      handleCloseEditor();
      return;
    }

    mutate({
        campaignId,
        status,
        dto: {
          notes: trimmedNotes,
        }
      },
      {
        onSuccess: () => {
          toast("Campaign note updated successfully",
            {
              type: "success",
              position: "top-right",
              autoClose: 3000
            });
          handleCloseEditor();
        },
      });
  };

  return (
    <Popover.Root open={isEditorOpen} onOpenChange={setIsEditorOpen}>
      <Popover.Anchor asChild>
        <div
          className={clsx(className, s.action)}
          onClick={isTouchDevice ? openEditor : undefined}
          onDoubleClick={!isTouchDevice ? openEditor : undefined}
        >
          <span className={s.cellNote}>{displayValue}</span>
        </div>
      </Popover.Anchor>


      <Popover.Portal>
        <Popover.Content
          className={s.popoverContent}
          side={"bottom"}
          align={"end"}
          sideOffset={-28}
          alignOffset={0}
          avoidCollisions={false}
        >
          <NotesEditor
            onSave={handleSave}
            isPending={isPending}
            initialValue={value ? value : ''}
            onClose={handleCloseEditor}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

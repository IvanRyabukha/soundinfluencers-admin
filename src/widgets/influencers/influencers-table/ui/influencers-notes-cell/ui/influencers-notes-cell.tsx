import React, { useCallback, useMemo, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { NotesEditor } from "@/shared/ui/notes-editor";
import clsx from "clsx";

import s from './influencers-notes-cell.module.scss';
import {
  useUpdateSocialAccountMutation
} from "@/entities/influencers/api/use-update-social-account-mutation.ts";
import { toast } from "react-toastify";

interface InfluencersNotesCellProps {
  influencerId: string;
  accountId: string;
  value: string;
  className?: string;
}

export const InfluencersNotesCell: React.FC<InfluencersNotesCellProps> = ({
  influencerId,
  accountId,
  value,
  className,
}) => {
  const { mutate, isPending } = useUpdateSocialAccountMutation();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const displayValue = value?.trim() ? value : "-";

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

  const handleSave = (notes: string) => {
    console.log("Saved notes:", notes);

    mutate({
      influencerId,
      accountId,
      dto: {
        internalNote: notes,
      }
    }, {
      onSuccess: () => {
        handleCloseEditor();
        toast("Notes updated successfully", {
          type: "success",
          position: "top-right",
          autoClose: 3000,
        });
      },
    })
  };

  return (
    <Popover.Root open={isEditorOpen} onOpenChange={setIsEditorOpen}>
      <Popover.Anchor asChild>
        <div
          className={clsx(className, s.action)}
          onClick={isTouchDevice ? openEditor : undefined}
          onDoubleClick={!isTouchDevice ? openEditor : undefined}
          title={displayValue}
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

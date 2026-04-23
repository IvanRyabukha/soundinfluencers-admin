import React, { useCallback, useMemo, useRef, useState } from "react";
import { useUpdateClientMutation } from "@/entities/client/api/use-update-client-mutation.ts";
import { toast } from "react-toastify";

import s from './client-note-editor.module.scss';

interface ClientNoteEditorProps {
  clientId: string;
  initialValue: string | undefined;
}

export const ClientNoteEditor: React.FC<ClientNoteEditorProps> = ({ clientId, initialValue }) => {
  const { mutate, isPending } = useUpdateClientMutation();
  const [draft, setDraft] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const isTouchDevice = useMemo(
    () => window.matchMedia("(pointer: coarse)").matches,
    []
  );

  const normalizedInitialValue = initialValue ?? "";

  const openEditor = useCallback((event: React.SyntheticEvent) => {
    event.stopPropagation();
    setDraft(normalizedInitialValue)
    setIsEditorOpen(true);
  }, [normalizedInitialValue]);

  const handleCloseEditor = useCallback(() => {
    setIsEditorOpen(false);
    setDraft("");
  }, []);

  const handleSave = useCallback(() => {
    if (isPending) return;

    const nextValue = draft.trim();
    const prevValue = normalizedInitialValue.trim();

    if (nextValue === prevValue) {
      handleCloseEditor();
      return;
    }

    mutate(
      {
        clientId,
        dto: {
          internalNote: draft,
        },
      },
      {
        onSuccess: () => {
          toast("Client note updated successfully", {
            type: "success",
            position: "top-right",
            autoClose: 3000,
          });
          handleCloseEditor();
        },
      },
    );
  }, [draft, normalizedInitialValue, mutate, clientId, isPending, handleCloseEditor]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current?.blur();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      handleCloseEditor();
    }
  }, [handleCloseEditor]);

  const displayValue = normalizedInitialValue.trim() ? normalizedInitialValue : "—";

  return (
    <div
      className={s.root}
      onClick={isTouchDevice ? openEditor : undefined}
      onDoubleClick={!isTouchDevice ? openEditor : undefined}
    >
      {isEditorOpen ?
        (<input
          ref={inputRef}
          className={s.textInput}
          type="text"
          value={draft}
          placeholder="Enter client note..."
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          disabled={isPending}
          autoFocus
        />
        ) : (
          <span className={s.text}>{displayValue}</span>
        )
      }
    </div>
  );
};

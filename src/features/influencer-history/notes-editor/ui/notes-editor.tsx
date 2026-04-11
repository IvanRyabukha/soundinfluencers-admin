import React, { useState } from "react";
import {
  useUpdateInfluencerCurrencyNoteMutation
} from "@/entities/influencer-history/api/use-update-currency-note-mutation.ts";
import { toast } from "react-toastify";

import edit from '@/assets/icons/influencers/edit-3.svg';
import s from './notes-editor.module.scss';

interface NotesEditorProps {
  influencerId: string;
  initialValue: string;
  onClose: () => void;
}

export const NotesEditor: React.FC<NotesEditorProps> = ({
  influencerId,
  initialValue,
  onClose,
}) => {
  const [draft, setDraft] = useState(initialValue);

  const { mutate, isPending } = useUpdateInfluencerCurrencyNoteMutation();

  const handleBlur = () => {
    const trimmedDraft = draft.trim();
    const trimmedInitialValue = initialValue.trim();

    if (trimmedDraft === trimmedInitialValue) {
      onClose();
      return;
    }

    mutate(
      {
        influencerId,
        currencyNote: trimmedDraft,
      },
      {
        onSuccess: () => {
          onClose();
          toast("Currency note updated successfully", {
            type: "success",
            position: "top-right",
            autoClose: 3000,
          });
        },
      },
    );
  };

  return (
    <div
      className={s.editor}
      aria-label="notes-editor"
    >
      <img
        className={s.icon}
        src={edit}
        alt=""
        width={24}
        height={24}
      />

      <input
        id="notes-editor"
        className={s.input}
        type="text"
        value={draft}
        disabled={isPending}
        onChange={(e) => {
          setDraft(e.target.value);
        }}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }

          if (e.key === "Escape") {
            setDraft(initialValue);
            onClose();
          }
        }}
        autoFocus
        autoComplete={"off"}
      />
    </div>
  );
};

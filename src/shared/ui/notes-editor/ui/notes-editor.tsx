import React, { useEffect, useRef, useState } from "react";

import s from './notes-editor.module.scss';

interface NotesEditorProps  {
  initialValue: string;
  onSave: (value: string) => void;
  onClose: () => void;
  isPending: boolean;
  placeholder?: string;
}

export const NotesEditor: React.FC<NotesEditorProps > = ({
  initialValue,
  onSave,
  onClose,
  isPending,
  placeholder = "Enter note...",
}) => {
  const [notes, setNotes] = useState(initialValue);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setNotes(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();

      const length = textAreaRef.current.value.length;
      textAreaRef.current.setSelectionRange(length, length);
    }
  }, []);

  return (
    <div className={s.editor}>
      <textarea
        ref={textAreaRef}
        className={s.textarea}
        placeholder={placeholder}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className={s.action}>
        <button
          className={s.btn}
          type="button"
          onClick={() => onSave(notes)}
          disabled={isPending}
        >
          {isPending ? 'Save...' : 'Save'}
        </button>

        <button
          className={s.btn}
          type="button"
          onClick={onClose}
          disabled={isPending}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

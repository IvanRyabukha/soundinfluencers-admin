import React, { useRef } from "react";
import clsx from "clsx";

import paperClip from '@/assets/icons/paperclip.svg';
import trash from '@/assets/icons/campaigns/icons/trash.svg';

import s from './image-upload.module.scss';
import { DotLoader } from "@/shared/ui/dot-loader/dot-loader.tsx";

interface ImageUploadProps {
  name: string;
  label: string;
  placeholder?: string;
  value: string | null;
  error?: string;
  disabled?: boolean;
  isPending?: boolean;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  name,
  label,
  placeholder = "Upload Image",
  value,
  error,
  disabled = false,
  isPending = false,
  onFileSelect,
  onRemove,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasPreview = Boolean(value);
  const isInteractive = !disabled && !isPending;

  const openFileDialog = () => {
    if (!isInteractive) return;
    inputRef.current?.click();
  };

  const resetNativeInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onFileSelect(file);
    resetNativeInput();
  };

  const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!isInteractive) return;

    onRemove();
    resetNativeInput();
  };

  return (
    <div className={s.imageUpload}>
      <label
        className={clsx(s.label, error && s.labelError)}
        htmlFor={name}
      >
        {label}
      </label>

      <input
        id={name}
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        disabled={!isInteractive}
        onChange={handleInputChange}
      />

      <div
        className={clsx(
          s.control,
          hasPreview && s.preview,
          error && s.inputError,
        )}
        onClick={!hasPreview ? openFileDialog : undefined}
        role={!hasPreview && isInteractive ? "button" : undefined}
        tabIndex={!hasPreview && isInteractive ? 0 : undefined}
        onKeyDown={(event) => {
          if (hasPreview || !isInteractive) return;

          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFileDialog();
          }
        }}
      >
        {isPending ? (
          <DotLoader />
        ) : hasPreview ? (
          <>
            <img
              src={value as string}
              alt="Uploaded preview"
              className={clsx(s.logo)}
              width={40}
              height={40}
              loading="lazy"
            />

            <button
              type="button"
              className={clsx(s.action)}
              onClick={handleRemoveClick}
              disabled={!isInteractive}
            >
              <img
                src={trash}
                alt="Remove logo"
                width={20}
                height={20}
              />
            </button>
          </>
        ) : (
          <>
            <span className={clsx(s.placeholder)}>{placeholder}</span>

            <button
              type="button"
              className={clsx(s.action)}
            >
              <img
                src={paperClip}
                alt="Add logo"
                width={20}
                height={20}
              />
            </button>
          </>
        )}
      </div>

      {error && (
        <span className={s.error}>
          {error}
        </span>
      )}
    </div>
  );
};

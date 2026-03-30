import React, { forwardRef } from "react";
import clsx from "clsx";

import styles from "./input.module.scss";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, name, leftSlot, rightSlot, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className={styles.root}>
        {label && (
          <label
            htmlFor={inputId}
            className={clsx(styles.label, error && styles.labelError)}
          >
            {label}
          </label>
        )}

        <div className={styles.control}>
          {leftSlot && leftSlot}

          <input
            ref={ref}
            id={inputId}
            name={name}
            className={clsx(styles.input, error && styles.inputError, className)}
            {...props}
          />

          {rightSlot && rightSlot}
        </div>

        {error && (
          <span className={styles.error}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";


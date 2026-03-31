import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useClickOutside } from "@/shared/hooks/use-click-outside.ts";
import clsx from 'clsx';

import chevron from '@/assets/icons/chevron-right.svg';

import s from './page-limit-select.module.scss';

interface PageLimitSelectProps {
  value: number;
  options: readonly { label: string; value: number }[];
  onValueChange: (value: number) => void;
}

export const PageLimitSelect: React.FC<PageLimitSelectProps> = ({
  value,
  options,
  onValueChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(() => {
    return options.find(option => option.value === value) ?? options[0];
  }, [value, options]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelect = useCallback(
    (nextValue: number) => {
      onValueChange(nextValue);
      setIsOpen(false);
    },
    [onValueChange],
  );

  useClickOutside(rootRef, handleClose);


  if (!selectedOption) return null;

  return (
    <div ref={rootRef} className={clsx(s.root)}>
      <button
        type="button"
        className={clsx(s.trigger)}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={s.value}>{selectedOption.label}</span>
        <img
          src={chevron}
          className={clsx(s.chevron, isOpen && s.chevronOpen)}
          alt={isOpen ? "Close options" : "Open options"}
          width={24}
          height={24}
        />
      </button>

      {isOpen && (
        <div className={s.dropdown} role="listbox" aria-label="Items per page">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                className={clsx(s.option)}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={isSelected}
              >
                <span className={s.label}>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

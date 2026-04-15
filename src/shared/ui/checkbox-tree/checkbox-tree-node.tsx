import React from "react";
import clsx from "clsx";
import type { NestedOption } from "./checkbox-tree.types";
import { getNodeOffset } from "./checkbox-tree.helpers";

import s from "./checkbox-tree.module.scss";

interface CheckboxTreeNodeProps {
  option: NestedOption;
  selectedValues: string[];
  disabled?: boolean;
  variant?: "creator" | "community";
  level?: number;
  hasMultipleRoots: boolean;
  onToggle: (option: NestedOption) => void;
}

export const CheckboxTreeNode: React.FC<CheckboxTreeNodeProps> = ({
  option,
  selectedValues,
  disabled = false,
  variant,
  level = 0,
  hasMultipleRoots,
  onToggle,
}) => {
  const checked = selectedValues.includes(option.value);

  return (
    <div className={clsx(s.item, variant === 'creator' && s.creatorItem)}>
      <div
        className={clsx(s.parentRow, level > 0 && s.childRow)}
        style={{ marginLeft: `${getNodeOffset(level, hasMultipleRoots)}px` }}
      >
        <input
          id={option.value}
          className={s.input}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={() => onToggle(option)}
        />

        <label
          htmlFor={option.value}
          className={clsx(
            s.label,
            level === 0 && variant === 'creator' && s.parentLabel,
          )}
        >
          {option.label}
        </label>
      </div>

      {!!option.children?.length && (
        <div className={clsx(s.children, variant === "creator" && s.childList)}>
          {option.children.map((child) => (
            <CheckboxTreeNode
              key={child.value}
              option={child}
              selectedValues={selectedValues}
              disabled={disabled}
              level={level + 1}
              hasMultipleRoots={hasMultipleRoots}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

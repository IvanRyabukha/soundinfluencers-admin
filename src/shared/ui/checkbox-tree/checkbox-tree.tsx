import React, { useMemo } from "react";
import type { NestedOption } from "./checkbox-tree.types";
import {
  buildTreeMetaMap,
  getNextSelectedValues,
} from "./checkbox-tree.helpers";
import { CheckboxTreeNode } from "./checkbox-tree-node";

import s from "./checkbox-tree.module.scss";

interface CheckboxTreeProps {
  options: NestedOption[];
  selectedValues: string[];
  disabled?: boolean;
  variant?: "creator" | "community";
  onChange: (values: string[]) => void;
}

export const CheckboxTree: React.FC<CheckboxTreeProps> = ({
  options,
  selectedValues,
  disabled = false,
  variant,
  onChange,
}) => {
  const metaMap = useMemo(() => buildTreeMetaMap(options), [options]);
  const hasMultipleRoots = options.length > 1;

  const handleToggle = (option: NestedOption) => {
    const nextValues = getNextSelectedValues(
      option,
      selectedValues,
      metaMap,
      options,
    );

    onChange(nextValues);
  };

  return (
    <div className={s.list}>
      {options.map((option) => (
        <CheckboxTreeNode
          key={option.value}
          option={option}
          selectedValues={selectedValues}
          disabled={disabled}
          level={0}
          variant={variant}
          hasMultipleRoots={hasMultipleRoots}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};

import React from "react";
import { Search } from "@/shared/ui";

interface SearchByQueryProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export const SearchByQuery: React.FC<SearchByQueryProps> = ({
  value,
  onChange,
  className,
  disabled,
}) => {

  return (
    <Search
      value={value}
      onSearchChange={onChange}
      className={className}
      disabled={disabled}
    />
  );
};

import React from "react";
import { Input } from "@/shared/ui";
import clsx from "clsx";

import search from '@/assets/icons/search.svg';
import styles from './search.module.scss';

interface SearchProps {
  value: string;
  onSearchChange: (value: string) => void;

  className?: string;
  disabled?: boolean;
}

export const Search: React.FC<SearchProps> = ({
  value,
  onSearchChange,
  className = '',
  disabled = false,
}) => {
  return (
    <Input
      id={'search'}
      className={clsx(styles.searchInput, className)}
      value={value}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search"
      type={'text'}
      disabled={disabled}
      leftSlot={
        <img
          src={search}
          alt={'Search'}
          width={24}
          height={24}
          className={styles.searchIcon}
        />
      }
    />
  )
};

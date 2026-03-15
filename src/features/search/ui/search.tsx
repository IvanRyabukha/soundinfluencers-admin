import React from "react";
import { Input } from "@/shared/ui";
import clsx from "clsx";

import search from '@/assets/icons/search.svg';
import styles from './search.module.scss';

interface SearchProps {
  value: string;
  onSearchChange: (value: string) => void;

  className?: string;
}

export const Search: React.FC<SearchProps> = ({ value, onSearchChange, className }) => {
  return (
    <Input
      id={'search'}
      className={clsx(styles.searchInput, className)}
      value={value}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search"
      type={'text'}
      leftSlot={
        <img
          src={search}
          alt={'Search'}
          className={styles.searchIcon}
        />
      }
    />
  )
};

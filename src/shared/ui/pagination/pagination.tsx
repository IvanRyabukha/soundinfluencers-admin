import React from "react";
import clsx from "clsx";

import chevron from '@/assets/icons/chevron-right.svg';

import s from './pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const visiblePages = 3;
  const maxStart = Math.max(1, totalPages - (visiblePages - 1));
  const startPage = Math.max(1, Math.min(currentPage - 1, maxStart));
  const length = Math.min(visiblePages, totalPages);

  const pages = Array.from({ length }, (_, index) => startPage + index);

  return (
    <div className={s.pagination}>
      <button
        className={s.chevronButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <img
          src={chevron}
          className={clsx(s.chevron, s.left)}
          alt="chevron"
        />
      </button>

      <div className={s.pages}>
        {pages.map((page) => (
          <button
            key={page}
            className={clsx(s.pageButton, page === currentPage && s.active)}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={s.chevronButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <img
          src={chevron}
          className={clsx(s.chevron, s.right)}
          alt="chevron"
        />
      </button>
    </div>
  );
};


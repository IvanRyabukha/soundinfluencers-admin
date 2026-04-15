import { SearchByQuery } from "@/features/search";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import type { IInfluencerSearchHistory } from "@/entities/influencer-history/model/influencer-history.types.ts";
import clsx from "clsx";

import s from './influencer-search.module.scss';
import { getSocialMediaIcon } from "@/shared/libs/get-social-media-icon.ts";
import { useClickOutside } from "@/shared/hooks/use-click-outside.ts";

interface InfluencerSearchProps {
  searchValue: string;
  onSearchChange: (searchQuery: string) => void;
  data: IInfluencerSearchHistory[];
  isDisabled?: boolean;
}

export const InfluencerSearch: React.FC<InfluencerSearchProps> = ({
  searchValue,
  onSearchChange,
  data,
  isDisabled,
}) => {
  console.log('Rendering InfluencerSearch with data:', data);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const showDropdown = searchValue.trim().length > 0 && data.length > 0;

  useClickOutside(rootRef, () => {
    if (showDropdown) {
      onSearchChange("");
    }
  });

  return (
    <div
      ref={rootRef}
      className={clsx(s.root, showDropdown && s.focused)}
    >
      <div className={s.inputWrapper}>
        <SearchByQuery
          value={searchValue}
          onChange={onSearchChange}
          disabled={isDisabled}
        />
      </div>

      <div
        className={clsx(
          s.listWrapper,
          showDropdown && s.listWrapperVisible,
        )}
      >
        <div
          className={s.list}
          role="listbox"
          aria-label="Influencer search results"
        >
          {data.map((item) => (
            <Link
              key={`${item.influencerId}-${item.accountId}`}
              to={`/dashboard/influencer-history/${item.influencerId}`}
              className={s.item}
            >
              <div className={s.left}>
                <img
                  className={s.avatar}
                  src={item.logoUrl}
                  alt={item.username}
                  width={32}
                  height={32}
                />

                <span className={s.username}>{item.username}</span>
              </div>

              <img
                className={s.icon}
                src={getSocialMediaIcon(item.socialMedia)}
                alt={item.socialMedia}
                width={24}
                height={24}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from "react";
import clsx from "clsx";
import { SOCIAL_MEDIA_OPTIONS, type TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

import s from './filter-influencers-by-platforms.module.scss';

interface FilterInfluencersByPlatformsProps {
  platforms: TSocialMediaValue | null;
  onPlatformChange: (platform: TSocialMediaValue) => void;
}

export const FilterInfluencersByPlatforms: React.FC<FilterInfluencersByPlatformsProps> = ({
  platforms,
  onPlatformChange
}) => {

  return (
    <div className={s.filterBar}>
      {SOCIAL_MEDIA_OPTIONS.map(platform => (
        <button
          key={platform.value}
          className={clsx(
            s.button,
            platform.value === platforms && s.active
          )}
          type="button"
          onClick={() => onPlatformChange(platform.value)}
        >
          <img
            src={platform.icon}
            alt={platform.value}
            className={s.icon}
            width={22}
            height={22}
          />
          <span className={s.label}>{platform.label}</span>
        </button>
      ))}
    </div>
  );
};

import React from "react";
import { FilterInfluencersByPlatforms } from "@/features/influencers/filter-influencers-by-platforms";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

import s from './platforms-filter-bar.module.scss';

interface PlatformsFilterBarProps {
  platform: TSocialMediaValue | null;
  onPlatformChange: (platform: TSocialMediaValue) => void;
}

export const PlatformsFilterBar: React.FC<PlatformsFilterBarProps> = ({
  platform,
  onPlatformChange
}) => {
  return (
    <div className={s.platformFilterBar}>
      <span className={s.label}>
        Choose your platforms
      </span>

      <FilterInfluencersByPlatforms
        platforms={platform}
        onPlatformChange={onPlatformChange}
      />
    </div>
  );
};

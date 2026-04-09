import React from "react";

import refresh from '@/assets/icons/influencers/rotate-ccw.svg';

import s from './refresh-influencers.module.scss';

interface RefreshInfluencersProps {
  //TODO: ids for refresh
  className?: string;
}

export const RefreshInfluencers: React.FC<RefreshInfluencersProps> = ({
  className,
}) => {

  const onRefresh = () => {
    alert("Refresh influencers functionality is not implemented yet.");
  }

  return (
    <button
      type="button"
      onClick={onRefresh}
      className={className}
    >
      <img
        src={refresh}
        className={s.icon}
        alt="Refresh Influencers"
        width={24}
        height={24}
      />
      Refresh
    </button>
  );
};

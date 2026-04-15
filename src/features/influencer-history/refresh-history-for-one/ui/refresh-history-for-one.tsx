import React from "react";
import { useParams } from "react-router-dom";
import { useCheckSocialAccountMutation } from "@/entities/influencer-history/api/use-check-social-account-mutation.ts";
import clsx from "clsx";

import rotate from '@/assets/icons/influencers/rotate-ccw.svg';
import s from './refresh-history-for-one.module.scss';

interface RefreshHistoryForOneProps {
  actionId: string;
}

export const RefreshHistoryForOne: React.FC<RefreshHistoryForOneProps> = ({
  actionId,
}) => {
  const { influencerId } = useParams();

  const { mutate, isPending } = useCheckSocialAccountMutation();

  const handleSync = () => {
    if (!influencerId) return;

    mutate({
      influencerId,
      actionId,
    });
  };

  return (
    <button
      className={s.refreshHistoryForOne}
      type="button"
      onClick={() => {
        if (!isPending) handleSync();
      }}
      aria-label="Refresh data"
    >
      <img
        className={clsx(s.refreshIcon, isPending && s.rotate)}
        src={rotate}
        alt=""
        width={16}
        height={16}
      />
    </button>
  );
};

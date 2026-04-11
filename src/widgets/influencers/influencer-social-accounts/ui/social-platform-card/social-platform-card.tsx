import React from "react";
import { Link } from "react-router-dom";
import { SocialAccountRow } from "@/widgets/influencers/influencer-social-accounts";
import type { TSocialAccountShort } from "@/entities/influencers/model/social-account.types.ts";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

import plus from '@/assets/icons/plus.svg';

import s from './social-platform-card.module.scss';

interface SocialPlatformCardProps {
  platform: TSocialMediaValue;
  platformLabel: string;
  platformIcon: string;
  accounts: TSocialAccountShort[];
}

export const SocialPlatformCard: React.FC<SocialPlatformCardProps> = ({
  platform,
  platformLabel,
  platformIcon,
  accounts,
}) => {
  return (
    <div className={s.socialPlatformCard}>
      <div className={s.header}>
        <div className={s.platformInfo}>
          <img
            className={s.platformIcon}
            src={platformIcon}
            alt={platformLabel}
            width={37}
            height={37}
          />
          <span className={s.label}>{platformLabel}</span>
        </div>

        <Link
          className={s.addAccount}
          to={`accounts/${platform}/create`}
        >
          <img
            className={s.addIcon}
            src={plus}
            alt={'Create new account'}
            width={24}
            height={24}
          />
          Add
        </Link>
      </div>

      {accounts.length > 0 && (
        <div className={s.accountsList} role="listbox" aria-label="Connected accounts">
          {accounts.map((account, index) => (
            <SocialAccountRow
              key={account.accountId}
              platform={platform}
              account={account}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

import React from "react";
import type { IInfluencerDetails } from "@/entities/influencers/model/influencers.types.ts";
import { SOCIAL_ACCOUNTS_PLATFORM_CONFIG, SocialPlatformCard } from "@/widgets/influencers/influencer-social-accounts";

import s from './influencer-social-accounts.module.scss';

interface InfluencerSocialAccountsProps {
  details: IInfluencerDetails;
}

export const InfluencerSocialAccounts: React.FC<InfluencerSocialAccountsProps> = ({
  details,
}) => {

  return (
    <div className={s.influencerSocialAccounts}>
      <h2 className={s.title}>Brand accounts</h2>

      <div className={s.platforms}>
        {SOCIAL_ACCOUNTS_PLATFORM_CONFIG.map((platform) => (
          <SocialPlatformCard
            key={platform.value}
            platform={platform.value}
            platformLabel={platform.label}
            platformIcon={platform.icon}
            accounts={details[platform.value]}
          />
        ))}
      </div>
    </div>
  );
};

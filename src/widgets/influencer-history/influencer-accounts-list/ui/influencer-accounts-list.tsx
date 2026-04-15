import React from "react";
import type { IInfluencerAccount } from "@/entities/influencer-history/model/influencer-history-detail.types.ts";
import { getSocialMediaIcon } from "@/shared/libs/get-social-media-icon.ts";
import { formatCurrency } from "@/shared/libs/format/format-currency.ts";

import s from './influencer-accounts-list.module.scss';

interface InfluencerAccountsListProps {
  accounts: IInfluencerAccount[];
}

export const InfluencerAccountsList: React.FC<InfluencerAccountsListProps> = ({
  accounts,
}) => {
  return (
    <ul className={s.influencerAccountsList}>
      {accounts.map((account) => (
        <li
          key={account.accountId}
          className={s.accountItem}
        >
          <img
            className={s.icon}
            src={getSocialMediaIcon(account.socialMedia)}
            alt={account.socialMedia}
            width={24}
            height={24}
          />

          <span className={s.username}>{account.username}</span>
          <span className={s.price}>{formatCurrency(account.price, 'EUR')}</span>
        </li>
      ))}
    </ul>
  );
};

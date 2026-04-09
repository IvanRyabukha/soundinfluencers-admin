import React from "react";
import clsx from "clsx";

import { CAMPAIGN_STATUSES } from "@/entities/campaign/model/campaign.constants.ts";
import { type TCampaignStatus } from "@/entities/campaign";

import styles from './filter-campaigns-by-status.module.scss';

interface FilterCampaignsByStatusProps {
  campaignStatus: TCampaignStatus | null;
  onChange: (status: TCampaignStatus | null) => void;
}

export const FilterCampaignsByStatus: React.FC<FilterCampaignsByStatusProps> = ({
  campaignStatus,
  onChange
}) => {

  return (
    <div className={styles.filterBar}>
      {CAMPAIGN_STATUSES.map(status => (
        <button
          key={status.value}
          className={styles.button}
          type="button"
          onClick={() => onChange(status.value)}
        >
          {status.label}
          <span className={clsx(styles.indicator, {
            [styles['indicator--active']]: campaignStatus === status.value,
          })}/>
        </button>
      ))}
    </div>
  )
};

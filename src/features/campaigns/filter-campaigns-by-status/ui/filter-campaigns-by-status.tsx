import { parseAsStringLiteral, useQueryState, parseAsNativeArrayOf } from "nuqs";
import type { TCampaignStatus } from "@/entities/campaign";
import clsx from "clsx";

import { CAMPAIGN_STATUSES } from "@/entities/campaign/model/campaign.constants.ts";

import styles from './filter-campaigns-by-status.module.scss';

export const FilterCampaignsByStatus = () => {
  const [campaignStatus, setCampaignStatus] = useQueryState<TCampaignStatus[]>("campaigns-status",
    parseAsNativeArrayOf(parseAsStringLiteral(CAMPAIGN_STATUSES.map(s => s.value))).withDefault([])
  );

  return (
    <div className={styles.filterBar}>
      {CAMPAIGN_STATUSES.map(status => (
        <button
          key={status.value}
          className={styles.button}
          onClick={() => setCampaignStatus(prev => prev.includes(status.value)
            ? prev.filter(s => s !== status.value) : [...prev, status.value], { history: "replace" })
          }
        >
          {status.label}
          <span className={clsx(styles.indicator, {
             [styles['indicator--active']]: campaignStatus.includes(status.value),
          })} />
        </button>
      ))}
    </div>
  )
};

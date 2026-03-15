import { DeleteCampaign } from "@/features/campaigns/delete-campaign/delete-campaign.tsx";
import { ExportCampaign } from "@/features/campaigns/export-campaign/export-campaign.tsx";

import styles from './campaign-actions-cell.module.scss';

export const CampaignActionsCell = () => {
  return (
    <div className={styles.campaignActionsCell}>
      <ExportCampaign />
      <DeleteCampaign />
    </div>
  );
};

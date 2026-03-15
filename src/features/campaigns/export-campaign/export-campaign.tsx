import { Button } from "@/shared/ui";
import exportCampaign from '@/assets/icons/campaigns/icons/upload.svg';

import styles from './export-campaign.module.scss';

export const ExportCampaign = () => {
  return (
    <Button
      className={styles.exportButton}
      variant={'action'}
      onClick={() => {
        alert(`Function don't implemented yet!`);
      }}
    >
      <img
        className={styles.icon}
        src={exportCampaign}
        alt="Delete Campaign"
        width={18}
        height={18}
      />
    </Button>
  );
};

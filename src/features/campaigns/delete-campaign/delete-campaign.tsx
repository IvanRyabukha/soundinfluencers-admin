import { Button } from "@/shared/ui";
import trash from '@/assets/icons/campaigns/icons/trash.svg';

import styles from './delete-campaign.module.scss';

export const DeleteCampaign = () => {
  return (
    <Button
      className={styles.deleteButton}
      variant={'action'}
      onClick={() => {
        alert(`Function don't implemented yet!`);
      }}
    >
      <img
        className={styles.icon}
        src={trash}
        alt="Delete Campaign"
        width={18}
        height={18}
      />
    </Button>
  );
};

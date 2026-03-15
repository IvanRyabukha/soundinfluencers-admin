import { Button } from "@/shared/ui";
import { Link } from 'react-router-dom';

import plus from '@/assets/icons/plus.svg';

import styles from './create-campaign.module.scss';

export const CreateCampaignLink = () => {
  return (
    <Button as={Link} to="/dashboard/create-new-campaign" variant={'action'}>
      <img
        src={plus}
        alt="Add New Campaign"
        className={styles.icon}
        width={16}
        height={16}
      />
      Create Campaign
    </Button>
  );
};

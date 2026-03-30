import { Link } from "react-router-dom";

import arrowUpRight from '@/assets/icons/arrow-up-right.svg';

import styles from './dashboard-quick-action.module.scss';

export const DashboardQuickAction = () => {
  return (
    <Link to="create-new-campaign" className={styles.action}>
      <span>Create a campaign</span>
      <div className={styles.icon}>
        <img
          src={arrowUpRight}
          alt="Create a campaign"
        />
      </div>
    </Link>
  );
};

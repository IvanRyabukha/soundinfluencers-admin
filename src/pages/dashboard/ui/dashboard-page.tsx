import { DashboardWelcome } from "@/widgets/dashboard/dashboard-welcome/ui/dashboard-welcome.tsx";
import { DashboardQuickAction } from "@/widgets/dashboard/dashboard-quick-action/ui/dashboard-quick-action.tsx";
import { DashboardNavSection } from "@/widgets/dashboard/dashboard-nav-section/ui/dashboard-nav-section.tsx";
import {
  CLIENT_LINKS,
  INFLUENCER_LINKS,
} from "@/widgets/dashboard/dashboard-nav-section/model/dashboard-nav-section.data.ts";

import styles from './dashboard-page.module.scss';

export const DashboardPage = () => {
  return (
    <div className={styles.dashboardPage}>
      <div className={styles.top}>
        <DashboardWelcome/>

        <DashboardQuickAction/>
      </div>

      <div className={styles.sections}>
        <DashboardNavSection
          title="Clients"
          items={CLIENT_LINKS}
        />
        <DashboardNavSection
          title="Influencers"
          items={INFLUENCER_LINKS}
        />
      </div>

      <div className={styles.footer}>
        <p>Patience - you can do it</p>
      </div>
    </div>
  )
};

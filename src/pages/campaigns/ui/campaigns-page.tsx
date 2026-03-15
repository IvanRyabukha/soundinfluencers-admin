import { useEffect, useState } from "react";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { PageBreadcrumbs } from "@/widgets/page-breadcrumbs";
import { PageTitle } from "@/widgets/page-title";
import { CampaignsToolbar } from "@/widgets/campaigns/campaigns-toolbar";
import { CampaignsTable } from "@/widgets/campaigns/campaigns-table";
import { OpenCampaignPayments } from "@/features/campaigns/open-campaign-payments";
import { getCampaigns } from "@/entities/campaign/api/campaign.api.ts";

import type { TViewCampaignMode } from "@/entities/campaign";

import styles from './campaigns-page.module.scss';

export const CampaignsPage = () => {
  const [campaignMode, setCampaignMode] = useQueryState<TViewCampaignMode>("campaigns-mode",
    parseAsStringLiteral(["main", "payments"]).withDefault("main")
  );

  const handleToggleCampaignMode = () => {
    const nextMode = campaignMode === "main" ? "payments" : "main";
    void setCampaignMode(nextMode, { history: "replace" });
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    getCampaigns().then((response) => {
      setData(response.items);
    })
    .catch((error) => {
      console.error("Error fetching campaigns:", error);
    });
  }, []);

  return (
    <div className={styles.campaignsPage}>

      <PageBreadcrumbs
        items={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Campaigns" },
        ]}
      />

      <div className={styles.content}>
        <div className={styles.top}>
          <PageTitle title={'Campaigns'}/>
          <CampaignsToolbar />
        </div>

        <div className={styles.bottom}>
          <OpenCampaignPayments campaignMode={campaignMode} onToggle={handleToggleCampaignMode}/>
          <CampaignsTable data={data} view={campaignMode} />
        </div>
      </div>

    </div>
  );
};

import { useParams } from "react-router-dom";

import { PageBreadcrumbs } from "@/widgets/page-breadcrumbs";
import { PageTitle } from "@/widgets/page-title";
import { CompanyDetails } from "@/widgets/clients/company-details/ui/company-details.tsx";
import { CompanyCampaigns } from "@/widgets/clients/campaigns-status";

import styles from './company-details-page.module.scss';
import { useClientQuery } from "@/entities/client/api/use-client-query.ts";
import { useEffect } from "react";
import { notifyApiError } from "@/app/api/errors/notify.ts";

export const CompanyDetailsPage = () => {
  const { clientId } = useParams();

  const { data, isLoading, isError, error } = useClientQuery(clientId);

  console.log('Client details data', data, isLoading, isError, error);

  useEffect(() => {
    if (isError && error) {
      notifyApiError(error);
    }
  }, [isError, error]);

  if (!clientId) {
    return <div>Client id is missing.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading client. Please try again later.</div>;
  }

  if (!data) {
    return <div>Client not found.</div>;
  }

  return (
    <div className={styles.companyDetailsPage}>
      <PageBreadcrumbs
        items={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Clients list", to: "/dashboard/clients" },
          { label: "Company details" },
        ]}
      />

      <div className={styles.content}>
        <div className={styles.header}>
          <PageTitle title={'Acenti'} />

          <CompanyDetails data={data} />
        </div>

        <div className={styles.campaigns}>
          <CompanyCampaigns data={data.campaignsActive} title={'Campaigns active'} />
          <CompanyCampaigns data={data.campaignsCompleted} title={'Campaigns completed'} />
        </div>
      </div>
    </div>
  );
};


// const mockedData = {
//   "clientId": "cl_102938",
//     "firstName": "Olivia",
//     "lastName": "Carter",
//     "company": "SoundWave Records",
//     "email": "olivia.carter@soundwave.com",
//     "companyType": "Music Label",
//     "proposalAccess": true,
//     "latestCampaignName": "Summer Viral Push",
//     "campaignsActive": [
//     {
//       "campaignId": "camp_1001",
//       "campaignName": "Summer Viral Push",
//       "socialMedia": "instagram",
//       "date": "24.04.2026",
//       "campaignPrice": 1200
//     },
//     {
//       "campaignId": "camp_1002",
//       "campaignName": "TikTok Dance Promo",
//       "socialMedia": "tiktok",
//       "date": "24.04.2026",
//       "campaignPrice": 1800
//     },
//     {
//       "campaignId": "camp_1003",
//       "campaignName": "YouTube Music Review",
//       "socialMedia": "youtube",
//       "date": "24.04.2026",
//       "campaignPrice": 2500
//     },
//     {
//       "campaignId": "camp_1004",
//       "campaignName": "Facebook Audience Boost",
//       "socialMedia": "facebook",
//       "date": "24.04.2026",
//       "campaignPrice": 950
//     }
//   ],
//     "campaignsCompleted": [
//     {
//       "campaignId": "camp_1005",
//       "campaignName": "Spotify Playlist Reach",
//       "socialMedia": "spotify",
//       "date": "24.04.2026",
//       "campaignPrice": 3000
//     },
//     {
//       "campaignId": "camp_1006",
//       "campaignName": "SoundCloud Indie Promo",
//       "socialMedia": "soundcloud",
//       "date": "24.04.2026",
//       "campaignPrice": 1100
//     },
//     {
//       "campaignId": "camp_1007",
//       "campaignName": "Press Release Distribution",
//       "socialMedia": "press",
//       "date": "24.04.2026",
//       "campaignPrice": 2200
//     },
//     {
//       "campaignId": "camp_1008",
//       "campaignName": "Multi-Channel Launch Campaign",
//       "socialMedia": "multipromo",
//       "date": "24.04.2026",
//       "campaignPrice": 5000
//     }
//   ],
//     "internalNote": "Client prefers bundled promotional campaigns and usually approves proposals within 24 hours."
// }

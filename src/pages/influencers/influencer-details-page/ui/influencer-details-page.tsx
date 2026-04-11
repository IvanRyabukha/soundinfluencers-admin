import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInfluencerQuery } from "@/entities/influencers/api/use-influencer-query.ts";
import { PageBreadcrumbs } from "@/widgets/page-breadcrumbs";
import { PageTitle } from "@/widgets/page-title";
import { InfluencerAccountDetails } from "@/widgets/influencers/influencer-account-details";
import { InfluencerSocialAccounts } from "@/widgets/influencers/influencer-social-accounts";
import { notifyApiError } from "@/app/api/errors/notify.ts";

import s from './influencer-details-page.module.scss';

export const InfluencerDetailsPage = () => {
  const { influencerId } = useParams();

  const { data, isLoading, isError, error } = useInfluencerQuery(influencerId);

  console.log('Influencer details data', data, isLoading, isError, error);

  useEffect(() => {
    if (isError && error) {
      notifyApiError(error);
    }
  }, [isError, error]);

  if (!influencerId) {
    return <div>Influencer id is missing.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading influencer. Please try again later.</div>;
  }

  if (!data) {
    return <div>Influencer not found.</div>;
  }

  return (
    <div className={s.influencerDetailsPage}>
      <PageBreadcrumbs
        items={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Influencers list", to: "/dashboard/influencers" },
          { label: "Account details" },
        ]}
      />

      <PageTitle
        title={data.email}
      />

      <InfluencerAccountDetails
        influencerId={influencerId}
        details={data}
      />

      <InfluencerSocialAccounts
        details={data}
      />
    </div>
  );
};

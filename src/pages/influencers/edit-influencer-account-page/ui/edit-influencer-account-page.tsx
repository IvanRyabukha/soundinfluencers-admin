import { useParams } from "react-router-dom";
import { getSocialMediaFromParam, SOCIAL_MEDIA_LABEL_MAP } from "@/entities/influencers/model/influencers.constants.ts";
import { PageTitle } from "@/widgets/page-title";
import { InfluencerAccountForm } from "@/widgets/influencers/influencer-account-form";

import { PageBreadcrumbs } from "@/widgets/page-breadcrumbs";
import { useSocialAccountQuery } from "@/entities/influencers/api/use-social-account-query.ts";
import { useEffect } from "react";
import { notifyApiError } from "@/app/api/errors/notify.ts";
import { mapInfluencerAccountDetailsDtoToForm } from "@/widgets/influencers/influencer-account-form/model";

import s from './edit-influencer-account-page.module.scss';

export const EditInfluencerAccountPage = () => {
  const { influencerId, accountId, platform } = useParams();

  const socialMedia = getSocialMediaFromParam(platform);

  const title = `Edit your ${socialMedia ? SOCIAL_MEDIA_LABEL_MAP[socialMedia] : 'Social'} Account Setup`;

  const { data, isLoading, isError, error } = useSocialAccountQuery({
    influencerId,
    accountId,
    socialMedia,
  });

  useEffect(() => {
    if (isError && error) {
      notifyApiError(error);
    }
  }, [isError, error]);

  if (!influencerId) {
    return <div>Influencer id is missing.</div>;
  }

  if (!accountId) {
    return <div>Account id is missing.</div>;
  }

  if (!socialMedia) {
    return <div>Social platform is missing or invalid.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading social account. Please try again later.</div>;
  }

  if (!data) {
    return <div>Social account not found.</div>;
  }

  return (
    <div className={s.editAccountPage}>
      <PageBreadcrumbs
        items={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Influencers list", to: "/dashboard/influencers" },
          { label: "Account details", to: `/dashboard/influencers/${influencerId}` },
          { label: "Edit" },
        ]}
      />

      <div className={s.content}>
        <PageTitle title={title}/>

        <InfluencerAccountForm
          platform={socialMedia}
          accountId={accountId}
          influencerId={influencerId}
          mode={"edit"}
          defaultValues={mapInfluencerAccountDetailsDtoToForm(data)}
        />
      </div>
    </div>
  );
};

import { useParams } from "react-router-dom";
import { getSocialMediaFromParam, SOCIAL_MEDIA_LABEL_MAP } from "@/entities/influencers/model/influencers.constants.ts";
import { PageTitle } from "@/widgets/page-title";
import { InfluencerAccountForm } from "@/widgets/influencers/influencer-account-form";
import { PageBreadcrumbs } from "@/widgets/page-breadcrumbs";

import s from './create-influencer-account-page.module.scss';

export const CreateInfluencerAccountPage = () => {
  const { influencerId, platform } = useParams();

  const socialMedia = getSocialMediaFromParam(platform);

  if (!influencerId) {
    return <div>Influencer id is missing.</div>;
  }

  if (!socialMedia) {
    return <div>Social platform is missing or invalid.</div>;
  }

  const title = `${SOCIAL_MEDIA_LABEL_MAP[socialMedia]} Account Setup`;

  return (
    <div className={s.createAccountPage}>
      <PageBreadcrumbs
        items={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Influencers list", to: "/dashboard/influencers" },
          { label: "Account details", to: `/dashboard/influencers/${influencerId}` },
          { label: "Create" },
        ]}
      />

      <div className={s.content}>
        <PageTitle title={title}/>

        <InfluencerAccountForm
          influencerId={influencerId}
          platform={socialMedia}
          mode={"create"}
        />
      </div>
    </div>
  );
};

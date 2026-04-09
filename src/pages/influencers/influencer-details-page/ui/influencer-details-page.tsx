import { PageBreadcrumbs } from "@/widgets/page-breadcrumbs";
import { PageTitle } from "@/widgets/page-title";
import { InfluencerAccountDetails } from "@/widgets/influencers/influencer-account-details";

import s from './influencer-details-page.module.scss';

export const InfluencerDetailsPage = () => {
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
        title={"Influencer account details"}
      />

      <InfluencerAccountDetails
        details={influencerDetails}
      />

    </div>
  );
};

export interface IBrandAccount {
  accountId: string;
  platform: string;
  username: string;
  profileLink: string;
  logoUrl: string;
  followers: number;
}

export interface IInfluencerDetails {
  influencerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  brandAccounts: IBrandAccount[];
}

const influencerDetails: IInfluencerDetails = {
  influencerId: "influencerId1",
  firstName: "Eric",
  lastName: "Smith",
  email: "eric@napoleon.com",
  phone: "+44 75 3712 9190",
  brandAccounts: [
    {
      accountId: "acc_1",
      platform: "instagram",
      username: "napoleon_grills",
      profileLink: "https://www.instagram.com/napoleon_grills",
      logoUrl: "https://placehold.co/40x40",
      followers: 154000
    },
    {
      accountId: "acc_2",
      platform: "tiktok",
      username: "napoleon_grills",
      profileLink: "https://www.tiktok.com/@napoleon_grills",
      logoUrl: "https://placehold.co/40x40",
      followers: 98200
    },
    {
      accountId: "acc_3",
      platform: "youtube",
      username: "Napoleon Grills",
      profileLink: "https://www.youtube.com/@napoleongrills",
      logoUrl: "https://placehold.co/40x40",
      followers: 41200
    },
    {
      accountId: "acc_4",
      platform: "facebook",
      username: "Napoleon Official",
      profileLink: "https://www.facebook.com/napoleongrills",
      logoUrl: "https://placehold.co/40x40",
      followers: 68000
    },
    {
      accountId: "acc_5",
      platform: "spotify",
      username: "Napoleon Brand",
      profileLink: "https://open.spotify.com/artist/napoleonbrand",
      logoUrl: "https://placehold.co/40x40",
      followers: 15400
    },
    {
      accountId: "acc_6",
      platform: "soundcloud",
      username: "Napoleon Music",
      profileLink: "https://soundcloud.com/napoleonmusic",
      logoUrl: "https://placehold.co/40x40",
      followers: 8700
    },
    {
      accountId: "acc_7",
      platform: "press",
      username: "Napoleon Press",
      profileLink: "https://press.napoleon.com",
      logoUrl: "https://placehold.co/40x40",
      followers: 0
    }
  ]
}

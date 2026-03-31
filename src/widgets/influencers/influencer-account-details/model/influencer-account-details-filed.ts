import type { IInfluencerDetails } from "@/pages/influencers/influencer-details-page/ui/influencer-details-page.tsx";

export type TDetailsField<T> = {
  label: string;
  key: keyof T;
}

export const INFLUENCER_ACCOUNT_DETAILS_FIELD = [
  { label: "First name", key: "firstName" },
  { label: "Last name", key: "lastName" },
  { label: "Email", key: "email" },
  { label: "Phone number", key: "phone" },
] satisfies TDetailsField<IInfluencerDetails>[];

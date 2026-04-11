import type { IInfluencerDetails } from "@/entities/influencers/model/influencers.types.ts";

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

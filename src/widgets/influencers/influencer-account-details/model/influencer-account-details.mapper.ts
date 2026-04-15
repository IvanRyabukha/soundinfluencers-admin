import type { IInfluencerDetails } from "@/entities/influencers/model/influencers.types.ts";
import type { InfluencerAccountDetailsFormValues } from "./influencer-account-details.schema";

export const mapInfluencerDetailsToFormValues = (
  details: IInfluencerDetails,
): InfluencerAccountDetailsFormValues => ({
  firstName: details.firstName ?? "",
  lastName: details.lastName ?? "",
  email: details.email ?? "",
  phone: details.phone ?? "",
});

export const mapInfluencerAccountDetailsFormToDto = (
  values: InfluencerAccountDetailsFormValues,
) => ({
  firstName: values.firstName.trim() || undefined,
  lastName: values.lastName.trim() || undefined,
  email: values.email.trim() || undefined,
  phone: values.phone.trim() || undefined,
});

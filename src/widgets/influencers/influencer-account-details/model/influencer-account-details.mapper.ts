import type { IInfluencerDetails } from "@/pages/influencers/influencer-details-page/ui/influencer-details-page.tsx";
import type { InfluencerAccountDetailsFormValues } from "./influencer-account-details.schema";

export const mapInfluencerDetailsToFormValues = (
  details: IInfluencerDetails,
): InfluencerAccountDetailsFormValues => ({
  firstName: details.firstName ?? "",
  lastName: details.lastName ?? "",
  email: details.email ?? "",
  phone: details.phone ?? "",
});

export const getInfluencerAccountDetailsDefaultValues =
  (): InfluencerAccountDetailsFormValues => ({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

export const mapInfluencerAccountDetailsFormToDto = (
  values: InfluencerAccountDetailsFormValues,
) => ({
  firstName: values.firstName.trim() || undefined,
  lastName: values.lastName.trim() || undefined,
  email: values.email.trim() || undefined,
  phone: values.phone.trim() || undefined,
});

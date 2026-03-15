import React from "react";

export type TInfoField<T> = {
  label: string
  key: keyof T
  render?: (value: T[keyof T], data: T) => React.ReactNode
}

export const leftFields: TInfoField<any>[] = [
  { label: "First name", key: "firstName" },
  { label: "Last name", key: "lastName" },
  { label: "Email", key: "email" },
  { label: "Phone number", key: "phone" },
];

export const rightFields: TInfoField<any>[] = [
  { label: "Company type", key: "companyType" },
  { label: "ID", key: "clientId" },
  {
    label: "Proposal access",
    key: "proposalAccess",
    render: (value) => (value ? "Enabled" : "Disabled"),
  },
  { label: "Latest campaign", key: "latestCampaignName" },
];

export const noteField: TInfoField<any>[] = [
  {label: "Internal note", key: "internalNote" },
];

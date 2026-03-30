import React from "react";
import type { IClientDetails } from "@/entities/client/model/client.types.ts";

export type TInfoField<T> = {
  label: string
  key: keyof T
  render?: (value: T[keyof T], data: T) => React.ReactNode
}

export const leftFields = [
  { label: "First name", key: "firstName" },
  { label: "Last name", key: "lastName" },
  { label: "Email", key: "email" },
  { label: "Phone number", key: "phone" },
] satisfies TInfoField<IClientDetails>[];

export const rightFields = [
  { label: "Company type", key: "companyType" },
  { label: "ID", key: "clientId" },
  {
    label: "Proposal access",
    key: "proposalAccess",
    render: (value) => (value ? "Enabled" : "Disabled"),
  },
  { label: "Latest campaign", key: "latestCampaignName" },
] satisfies TInfoField<IClientDetails>[];

export const noteField = [
  {label: "Internal note", key: "internalNote" },
] satisfies TInfoField<IClientDetails>[];

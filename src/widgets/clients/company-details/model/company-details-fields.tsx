import React from "react";
import { ClientProposalAccessSwitch } from "@/features/clients/client-proposal-access-switch";
import { ClientNoteEditor } from "@/features/clients/client-note-editor";
import type { IClientDetails } from "@/entities/client/model/client.types.ts";

export type TInfoField<T> = {
  label: string;
  key: keyof T;
  render?: (data: T) => React.ReactNode;
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
    render: (data: IClientDetails) => (
      <ClientProposalAccessSwitch value={data.proposalAccess} clientId={data.clientId} />
    ),
  },
  { label: "Latest campaign", key: "latestCampaignName" },
] satisfies TInfoField<IClientDetails>[];

export const noteField = [
  {
    label: "Internal note",
    key: "internalNote",
    render: (data: IClientDetails) => (
      <ClientNoteEditor
        initialValue={data.internalNote}
        clientId={data.clientId} />
    ),
  },
] satisfies TInfoField<IClientDetails>[];

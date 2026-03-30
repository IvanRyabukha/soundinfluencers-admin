import type { TSocialMedia } from "@/shared/types/types.ts";

export interface IClient {
  clientId: string;
  company: string;
  name: string;
  email: string;
  companyType: string;
  proposalAccess: boolean;
  campaignsCompleted: number;
  campaignsActive: number;
}

export type TGetClientsParams =
  | {
  limit: number;
  page: number;
  search?: undefined;
}
  | {
  limit: number;
  search: string;
  page?: undefined;
};

export interface IClientsListPayload {
  items: IClient[];
  total: number;
  page: number;
  limit: number;
}

export interface IClientsListResponse {
  statusCode: number;
  message: string;
  data: IClientsListPayload;
}

// Client details
export interface IClientCampaign {
  campaignId: string;
  campaignName: string;
  socialMedia: TSocialMedia;
  date: string;
  campaignPrice: number;
}

export interface IClientDetails {
  clientId: string;
  company: string;
  name: string;
  email: string;
  companyType: string;
  proposalAccess: boolean;
  lastName: string;
  phone: string;
  latestCampaignName: string;
  internalNote: string;
  campaignsActive: IClientCampaign[];
  campaignsCompleted: IClientCampaign[];
}

export interface IClientResponse {
  statusCode: number;
  message: string;
  data: IClientDetails;
}


import type { TSocialMedia } from "@/shared/types/types.ts";

export type TCampaignStatus = 'proposal' | 'pending' | 'distributing' | 'completed';
export type TViewCampaignMode = 'main' | 'payments';

export interface ICampaign {
  campaignId: string;
  socialMedia: TSocialMedia;
  campaignName: string;
  creatorRole: string; // check role
  creatorName: string;
  followers: number;
  cost: number;
  salePrice: number;
  publicPrice: number;
  createdAt: string;
  status: TCampaignStatus;
  statusLabel: string;
  reportSent: boolean;
  paymentStatus: 'wait' | 'paid';
  invoiceId: string;
  shortInvoiceId: string;
  notes: string;
  affiliatePartner: string;
  affiliateCommission: string;
  affiliatePaid: number;
}

export interface IGetCampaignParams {
  status: TCampaignStatus;
  page: number;
  limit: number;
  search?: string;
}

export interface ICampaignListPayload {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  items: ICampaign[];
}

export interface ICampaignListResponse {
  statusCode: number;
  message: string;
  data: ICampaignListPayload;
}

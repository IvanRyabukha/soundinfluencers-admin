import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

export type TActionType = 'invoice' | 'campaign';
export type TPaymentMethod = "paypal" | "ukBankTransfer" | "internationalBankTransfer";

export interface IInfluencerAccount {
  accountId: string;
  socialMedia: TSocialMediaValue;
  username: string;
  price: number;
}

export interface IInfluencerActionBase {
  actionType: TActionType;
  actionId: string;
  currentBalance: number;
  dateAndTime: string;
}

export interface IInvoiceAction extends IInfluencerActionBase {
  actionType: "invoice";
  amount: number;
  invoiceId: string;
  paymentMethod: TPaymentMethod;
}

export interface ICampaignAction extends IInfluencerActionBase {
  actionType: "campaign";
  campaignName: string;
  reward: number;
  socialMedia: TSocialMediaValue;
  status: number;
  statusLabel: string;
  username: string;
  isStillInCampaign: boolean;
}

export type TInfluencerHistoryAction = IInvoiceAction | ICampaignAction;

export interface IInfluencerHistory {
  accounts: IInfluencerAccount[];
  actions: TInfluencerHistoryAction[];
  currencyNote: string;
  influencerName: string;
}

export interface IGetInfluencerHistoryDetailsQueryParams {
  page: number;
  limit: number;
}

export interface IInfluencerHistoryDetailPayload {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  history: IInfluencerHistory;
}

export interface IInfluencerHistoryDetailResponse {
  statusCode: number;
  message: string;
  data: IInfluencerHistoryDetailPayload;
}

export interface ICheckSocialAccountInCampaignResponse {
  statusCode: number;
  message: string;
  data: boolean;
}

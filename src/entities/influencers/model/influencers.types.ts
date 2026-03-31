import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";
import type { TCurrency } from "@/shared/types/types.ts";

export interface IInfluencerAccount {
  influencerId: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  balance: number,
  accountId: string,
  username: string,
  socialMedia: TSocialMediaValue,
  logoUrl: string,
  followers: number,
  profileLink: string,
  publicPrice: number,
  price: number,
  initialPrice: number,
  currency: TCurrency,
  costPerFollower: number,
  isHidden: boolean,
  internalNote: string,
}

export type TGetInfluencerAccountParams = {
  limit: number;
  page: number;
  search?: string;
  platform?: TSocialMediaValue;
};

export interface IInfluencerAccountListPayload {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  items: IInfluencerAccount[];
}

export interface IInfluencerAccountListResponse {
  statusCode: number;
  message: string;
  data: IInfluencerAccountListPayload;
}

//update influencer
export interface IUpdateInfluencerDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  logoUrl?: string;
  balance?: number;
  internalNote?: string;
}

export interface IUpdateInfluencerParams {
  influencerId: string;
  dto: IUpdateInfluencerDto;
}



// update influencer Social Account
export interface IUpdateSocialAccountDto {
  influencerId: string;
  accountId: string;
  socialMedia: TSocialMediaValue;

  isHidden?: boolean;
  profileLink?: string;
  publicPrice?: number;
  price?: number;
}

export interface IUpdateSocialAccountResponse {
  statusCode: number;
  message: string;
  data: IInfluencerAccount;
}




// balance?: number;
// internalNote?: string;
















// upload XLSX
export interface UploadInfluencersXlsxParams {
  file: File;
  socialMedia: TSocialMediaValue;
}

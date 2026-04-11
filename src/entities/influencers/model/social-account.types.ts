import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";
import type { TCurrency } from "@/shared/types/types.ts";

export interface ISocialAccount {
  accountId: string;
  socialMedia: TSocialMediaValue;
  username: string;
  profileLink: string;
  followers: number;
  logoUrl: string;
  price: number;
  publicPrice: number;
  initialPrice: number;
  currency: TCurrency;
  engagementRate: number;
  averageViews: number;
  musicGenres: {
    genre: string;
    subGenres: string[];
  }[];
  creatorCategories: string[];
  countries: {
    country: string;
    percentage: number;
  }[];
  categories: string[];
  profileCategory: "community" | "creator";
  influencerId: string;
  isHidden: boolean;
}

// Short social account for influencer details
export type TSocialAccountShort = Pick<ISocialAccount, 'accountId' | 'username'>;

// Get social account by id
export type TGetSocialAccountParams = {
  influencerId: string;
  accountId: string;
  socialMedia: TSocialMediaValue;
}
export interface ISocialAccountResponse {
  statusCode: number;
  message: string;
  data: ISocialAccount;
}

export type TSocialAccountBaseDto = Omit<
  ISocialAccount,
  "accountId" | "socialMedia" | "influencerId" | "isHidden" | "publicPrice" | "price" | "initialPrice"
>;
export type TCreateSocialAccountDto = TSocialAccountBaseDto & Pick<ISocialAccount, "price">;
export type TUpdateSocialAccountDto = TSocialAccountBaseDto & Pick<
  ISocialAccount,
  "accountId" | "socialMedia" | "influencerId" | "initialPrice"
>;

export type TCreateSocialAccountParams = {
  influencerId: string;
  socialMedia: TSocialMediaValue;
  dto: TCreateSocialAccountDto;
}

export type TDeleteSocialAccountParams = {
  influencerId: string;
  accountId: string;
  socialMedia: TSocialMediaValue;
};

// update Social Account for influencer list
export interface IUpdateListSocialAccountDto {
  influencerId: string;
  accountId: string;
  socialMedia: TSocialMediaValue;

  profileLink?: string;
  publicPrice?: number;
  price?: number;
  isHidden?: boolean;
}

import { $api } from "@/app/api/http.ts";
import type {
  IInfluencerHistoryResponse, IInfluencerSearchHistoryResponse,
  TGetInfluencerHistoryParams, TGetInfluencerSearchHistoryParams,
} from "@/entities/influencer-history/model/influencer-history.types.ts";
import type {
  ICheckSocialAccountInCampaignResponse,
  IGetInfluencerHistoryDetailsQueryParams,
  IInfluencerHistoryDetailResponse,
} from "@/entities/influencer-history/model/influencer-history-detail.types.ts";

export const getInfluencerHistory = async (params: TGetInfluencerHistoryParams) => {
  console.log('Getting influencer history...', params);

  const { data } = await $api.get<IInfluencerHistoryResponse>('/admin/actions-history/latest', {
    params: params,
  });

  console.log('Successfully got influencer history', data);

  return data.data;
};

export const getInfluencersBySearchQuery = async (params: TGetInfluencerSearchHistoryParams) => {
  console.log('Getting influencer history...', params);

  const { data } = await $api.get<IInfluencerSearchHistoryResponse>('/admin/actions-history/search', {
    params: params,
  });

  console.log('Successfully got influencer history', data);

  return data.data;
};

export const getInfluencerHistoryById = async (
  influencerId: string,
  params: IGetInfluencerHistoryDetailsQueryParams
) => {
  console.log('Getting influencer history details...', influencerId, params);

  const { data } = await $api.get<IInfluencerHistoryDetailResponse>(`/admin/actions-history/${influencerId}`, {
    params,
  });

  console.log('Successfully got influencer history details');

  return data.data;
};

export const checkSocialAccountInCampaign = async (
  influencerId: string,
  actionId: string,
) => {
  console.log(`Checking social account in campaign for influencer ${influencerId} and action ${actionId}...`);

  const { data } = await $api.patch<ICheckSocialAccountInCampaignResponse>(
    `/admin/actions-history/${influencerId}/campaigns/${actionId}/sync`,
  );

  console.log('Successfully checked social account in campaign', data);

  return data;
};

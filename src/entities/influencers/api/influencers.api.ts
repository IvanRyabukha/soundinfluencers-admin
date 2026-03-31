import { $api } from '@/app/api/http.ts';
import type {
  IInfluencerAccountListResponse,
  IUpdateSocialAccountDto, IUpdateSocialAccountResponse,
  TGetInfluencerAccountParams,
  UploadInfluencersXlsxParams,
} from "@/entities/influencers/model/influencers.types.ts";

export const getInfluencers = async (params: TGetInfluencerAccountParams) => {
  console.log('Fetching influencers with params:', params);

  const { data } = await $api.get<IInfluencerAccountListResponse>(`/admin/influencers/`, {
    params,
  });

  console.log('Successfully fetched influencers', data);

  return data.data;
}

export const updateSocialAccount = async (dto: IUpdateSocialAccountDto) => {
  console.log(`Updating influencer social account for influencer with data:`, dto);

  const { data } = await $api.patch<IUpdateSocialAccountResponse>(`/admin/influencers/social-account`, dto);

  console.log('Successfully fetched influencers', data);

  return data.data;
}



// Influencer details
export const updateInfluencer = async () => {}


// Export influencers-list XLSX
export const uploadInfluencersXlsx = async ({
  file, socialMedia
}: UploadInfluencersXlsxParams) => {
  console.log('Sending XLSX file to server:', file);

  const formData = new FormData();
  formData.append('file', file);

  console.log('FormData prepared for upload:', formData.get('file'));

  await $api.post(`/admin/influencers/${socialMedia}/xlsx`, formData);

  console.log('Successfully uploaded XLSX file');
};

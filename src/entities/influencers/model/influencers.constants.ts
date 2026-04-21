import type { TSocialMedia } from "@/shared/types/types.ts";

import instagram from '@/assets/icons/influencers/social-media/instagram.svg';
import tiktok from '@/assets/icons/influencers/social-media/tiktok.svg';
import spotify from '@/assets/icons/influencers/social-media/spotify.svg';
import facebook from '@/assets/icons/influencers/social-media/facebook.svg';
import soundcloud from '@/assets/icons/influencers/social-media/soundcloud.svg';
import youtube from '@/assets/icons/influencers/social-media/youtube.svg';
import press from '@/assets/icons/influencers/social-media/press.svg';

export const SOCIAL_MEDIA_OPTIONS = [
  { label: "Instagram", value: "instagram", icon: instagram },
  { label: "TikTok", value: "tiktok", icon: tiktok },
  { label: "Spotify", value: "spotify", icon: spotify },
  { label: "Facebook", value: "facebook", icon: facebook },
  { label: "SoundCloud", value: "soundcloud", icon: soundcloud },
  { label: "YouTube", value: "youtube", icon: youtube },
  { label: "Press", value: "press", icon: press },
] as const satisfies {
  label: string;
  value: Exclude<TSocialMedia, "multipromo">;
  icon: string;
}[];

export type TSocialMediaOption = typeof SOCIAL_MEDIA_OPTIONS[number];
export type TSocialMediaValue = TSocialMediaOption["value"];

export const SOCIAL_MEDIA_LABEL_MAP = Object.fromEntries(
  SOCIAL_MEDIA_OPTIONS.map(({ value, label }) => [value, label])
) as Record<TSocialMediaValue, string>;

export const isSocialMediaValue = (value: string): value is TSocialMediaValue => {
  return SOCIAL_MEDIA_OPTIONS.some((item) => item.value === value);
};

export const getSocialMediaFromParam = (
  platform: string | undefined,
): TSocialMediaValue | undefined => {
  if (!platform) return undefined;
  return isSocialMediaValue(platform) ? platform : undefined;
};

export const ITEMS_LIMIT = [
  { label: "10 per page", value: 10 },
  { label: "20 per page", value: 20 },
  { label: "30 per page", value: 30 },
] as const satisfies {
  label: string;
  value: number;
}[];

import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

import instagramIcon from '@/assets/icons/influencers/account-details/instagram.svg';
import tiktokIcon from '@/assets/icons/influencers/account-details/tiktok.svg';
import youtubeIcon from '@/assets/icons/influencers/account-details/youtube.svg';
import facebookIcon from '@/assets/icons/influencers/account-details/facebook.svg';
import spotifyIcon from '@/assets/icons/influencers/account-details/spotify.svg';
import soundcloudIcon from '@/assets/icons/influencers/account-details/soundcloud.svg';
import pressIcon from '@/assets/icons/influencers/account-details/press.svg';

export const SOCIAL_ACCOUNTS_PLATFORM_CONFIG = [
  { value: "instagram", label: "Instagram", icon: instagramIcon },
  { value: "tiktok", label: "TikTok", icon: tiktokIcon },
  { value: "spotify", label: "Spotify", icon: spotifyIcon },
  { value: "youtube", label: "YouTube", icon: youtubeIcon },
  { value: "facebook", label: "Facebook", icon: facebookIcon },
  { value: "soundcloud", label: "SoundCloud", icon: soundcloudIcon },
  { value: "press", label: "Press", icon: pressIcon },
] satisfies {
  value: TSocialMediaValue;
  label: string;
  icon: string;
}[];

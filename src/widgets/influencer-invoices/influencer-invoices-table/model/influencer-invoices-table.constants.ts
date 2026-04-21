import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

import instagram from '@/assets/icons/influencers/social-media/instagram.svg';
import tiktok from '@/assets/icons/influencers/social-media/tiktok.svg';
import spotify from '@/assets/icons/influencers/social-media/spotify.svg';
import facebook from '@/assets/icons/influencers/social-media/facebook.svg';
import soundcloud from '@/assets/icons/influencers/social-media/soundcloud.svg';
import youtube from '@/assets/icons/influencers/social-media/youtube.svg';
import press from '@/assets/icons/influencers/social-media/press.svg';

export const SOCIAL_MEDIA_ICONS: Record<TSocialMediaValue, string> = {
  instagram: instagram,
  tiktok: tiktok,
  spotify: spotify,
  facebook: facebook,
  soundcloud: soundcloud,
  youtube: youtube,
  press: press,
}

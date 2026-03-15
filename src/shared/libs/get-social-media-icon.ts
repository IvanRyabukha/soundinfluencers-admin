import type { TSocialMedia } from "@/shared/types/types.ts";

import instagramIcon from "@/assets/icons/campaigns/social-media/instagram.svg";
import tiktokIcon from "@/assets/icons/campaigns/social-media/tiktok.svg";
import youtubeIcon from "@/assets/icons/campaigns/social-media/youtube.svg";
import facebookIcon from "@/assets/icons/campaigns/social-media/facebook.svg";
import spotifyIcon from "@/assets/icons/campaigns/social-media/spotify.svg";
import soundcloudIcon from "@/assets/icons/campaigns/social-media/soundcloud.svg";
import pressIcon from "@/assets/icons/campaigns/social-media/press.svg";
import multipromoIcon from "@/assets/icons/campaigns/social-media/multipromo.svg";

export const getSocialMediaIcon = (socialMedia: TSocialMedia) => {
  switch (socialMedia) {
    case "instagram":
      return instagramIcon;
    case "tiktok":
      return tiktokIcon;
    case "youtube":
      return youtubeIcon;
    case "facebook":
      return facebookIcon;
    case "spotify":
      return spotifyIcon;
    case "soundcloud":
      return soundcloudIcon;
    case "press":
      return pressIcon;
    case "multipromo":
      return multipromoIcon;

    default:
      return '';
  }
};

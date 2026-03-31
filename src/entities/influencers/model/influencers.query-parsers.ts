import { parseAsStringLiteral } from "nuqs";
import { SOCIAL_MEDIA_OPTIONS, type TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

export const platformsValue: TSocialMediaValue[] =
  SOCIAL_MEDIA_OPTIONS.map((platform) => platform.value);

export const platformParser =
  parseAsStringLiteral(platformsValue);

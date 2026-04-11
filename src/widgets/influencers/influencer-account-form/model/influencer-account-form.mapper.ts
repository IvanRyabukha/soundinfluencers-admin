import type { TInfluencerAccountFormValues } from "./influencer-account-form.schema";
import type {
  ISocialAccount, TCreateSocialAccountDto,
  TSocialAccountBaseDto, TUpdateSocialAccountDto,
} from "@/entities/influencers/model/social-account.types.ts";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";
import type { NestedOption } from "@/shared/ui/checkbox-tree/checkbox-tree.types.ts";
import {
  CONTENT_FOCUS_OPTIONS,
  MUSIC_GENRES_COMMUNITY, MUSIC_GENRES_CREATOR,
} from "@/widgets/influencers/influencer-account-form/model/influencer-account-form.constants.ts";

export const getInfluencerAccountFormDefaultValues =
  (): TInfluencerAccountFormValues => ({
    username: "",
    profileLink: "",
    followers: "",
    logoUrl: "",

    profileCategory: 'community',

    musicGenresCommunity: [],
    themeTopics: [],
    musicGenresCreator: [],
    contentFocus: [],

    countries: [
      { country: "", percentage: "" },
      { country: "", percentage: "" },
      { country: "", percentage: "" },
      { country: "", percentage: "" },
      { country: "", percentage: "" },
    ],

    averageViews: "",
    engagementRate: "",
    currency: "EUR",
    initialPrice: "",
  });

// TO DTO
const toNumber = (value: string): number => {
  const normalized = value.replace(",", ".").trim();

  if (!normalized) return 0;

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const mapCountriesToDto = (
  countries: TInfluencerAccountFormValues["countries"],
): { country: string; percentage: number }[] => {
  return countries
  .filter((item) => item.country.trim() || item.percentage.trim())
  .map((item) => ({
    country: item.country.trim(),
    percentage: toNumber(item.percentage),
  }));
};

const mapFlatOptionsToMusicGenres = (
  selectedValues: string[],
  options: readonly NestedOption[],
): { genre: string; subGenres: string[] }[] => {
  const selectedSet = new Set(selectedValues);
  const result: { genre: string; subGenres: string[] }[] = [];

  for (const option of options) {
    const hasChildren = Boolean(option.children?.length);

    if (!hasChildren) {
      if (selectedSet.has(option.value)) {
        result.push({
          genre: option.value,
          subGenres: [],
        });
      }

      continue;
    }

    const selectedChildren =
      option.children
      ?.filter((child) => selectedSet.has(child.value))
      .map((child) => child.value) ?? [];

    const isParentSelected = selectedSet.has(option.value);

    if (isParentSelected || selectedChildren.length > 0) {
      result.push({
        genre: option.value,
        subGenres: selectedChildren,
      });
    }
  }

  return result;
};

export const mapInfluencerAccountDetailsFormToDto = (
  values: TInfluencerAccountFormValues,
): TSocialAccountBaseDto => {
  console.log("Mapping form values to DTO:", values);

  const isCommunity = values.profileCategory === "community";

  return {
    username: values.username,
    profileLink: values.profileLink,
    followers: toNumber(values.followers),
    logoUrl: values.logoUrl,
    currency: values.currency,
    engagementRate: toNumber(values.engagementRate),
    averageViews: toNumber(values.averageViews),

    musicGenres: isCommunity
      ? mapFlatOptionsToMusicGenres(values.musicGenresCommunity, MUSIC_GENRES_COMMUNITY)
      : [],

    creatorCategories: isCommunity ? [] : [...values.musicGenresCreator, ...values.contentFocus],
    categories: isCommunity ? values.themeTopics : [],

    countries: mapCountriesToDto(values.countries),

    profileCategory: values.profileCategory,
  }
};

export const mapInfluencerAccountFormToCreateDto = (
  values: TInfluencerAccountFormValues,
): TCreateSocialAccountDto => {
  return {
    ...mapInfluencerAccountDetailsFormToDto(values),
    price: toNumber(values.initialPrice),
  };
};

export const mapInfluencerAccountFormToUpdateDto = (
  values: TInfluencerAccountFormValues,
  platform: TSocialMediaValue,
  accountId: string,
  influencerId: string,
): TUpdateSocialAccountDto => {
  return {
    ...mapInfluencerAccountDetailsFormToDto(values),
    initialPrice: toNumber(values.initialPrice),
    accountId,
    socialMedia: platform,
    influencerId,
  };
};


// TO FORM VALUES
const toFormString = (value: number | null | undefined): string => {
  if (value == null) return "";
  return String(value);
};

const mapMusicGenresDtoToFormValues = (
  musicGenres: { genre: string; subGenres: string[] }[],
): string[] => {
  return musicGenres.flatMap((item) => [item.genre, ...item.subGenres]);
};

const getOptionValuesSet = (options: readonly NestedOption[]): Set<string> => {
  return new Set(
    options.flatMap((option) => [
      option.value,
      ...(option.children?.map((child) => child.value) ?? []),
    ]),
  );
};

const normalizeCountriesForForm = (
  countries: { country: string; percentage: number }[],
  size = 5,
) => {
  const mapped = countries.map((item) => ({
    country: item.country ?? "",
    percentage: toFormString(item.percentage),
  }));

  while (mapped.length < size) {
    mapped.push({
      country: "",
      percentage: "",
    });
  }

  return mapped.slice(0, size);
};


const CREATOR_GENRE_VALUES = getOptionValuesSet(MUSIC_GENRES_CREATOR);
const CONTENT_FOCUS_VALUES = getOptionValuesSet(CONTENT_FOCUS_OPTIONS);

export const mapInfluencerAccountDetailsDtoToForm = (
  dto: ISocialAccount,
): TInfluencerAccountFormValues => {
  const isCommunity = dto.profileCategory === "community";

  const creatorCategories = dto.creatorCategories ?? [];

  return {
    username: dto.username ?? "",
    profileLink: dto.profileLink ?? "",
    followers: toFormString(dto.followers),
    logoUrl: dto.logoUrl ?? "",

    profileCategory: dto.profileCategory,

    musicGenresCommunity: isCommunity
      ? mapMusicGenresDtoToFormValues(dto.musicGenres ?? [])
      : [],

    themeTopics: isCommunity ? (dto.categories ?? []) : [],

    musicGenresCreator: isCommunity
      ? []
      : creatorCategories.filter((item) => CREATOR_GENRE_VALUES.has(item)),

    contentFocus: isCommunity
      ? []
      : creatorCategories.filter((item) => CONTENT_FOCUS_VALUES.has(item)),

    countries: normalizeCountriesForForm(dto.countries ?? []),

    averageViews: toFormString(dto.averageViews),
    engagementRate: toFormString(dto.engagementRate),
    currency: dto.currency,
    initialPrice: toFormString(dto.initialPrice),
  };
};

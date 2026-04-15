import type {
    AddAccountsCurrency,
    AddAccountsFilterMethod,
    AddAccountsSortBy,
} from "./add-accounts.types";

export const DEFAULT_CURRENCY: AddAccountsCurrency = "EUR";
export const DEFAULT_SORT_BY: AddAccountsSortBy = "bestMatch";
export const DEFAULT_FILTER_METHOD: AddAccountsFilterMethod = "and";
export const DEFAULT_BUDGET = 0;

export const DEFAULT_SOCIALS = new Set(["instagram", "tiktok"]);

export const MAIN_NETWORKS = ["facebook", "instagram", "youtube", "tiktok"];
export const MUSIC_NETWORKS = ["spotify", "soundcloud"];
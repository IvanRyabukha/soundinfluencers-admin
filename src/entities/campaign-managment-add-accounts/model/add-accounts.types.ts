export type AddAccountsCurrency = "EUR" | "USD" | "GBP";
export type AddAccountsSortBy =
    | "bestMatch"
    | "lowestPrice"
    | "highestPrice"
    | "lowestFollowers"
    | "highestFollowers";

export type AddAccountsViewMode = "table" | "grid";
export type AddAccountsFilterMethod = "and" | "or";

export type FilterItem = {
    id: string;
    group: string;
    filterName: string;
    count?: number;
    children?: FilterItem[];
};

export type FilterBlock = {
    id: string;
    title: string;
    AndOrFlag?: Array<{ method: string }>;
    filters: FilterItem[];
};

export type SocialAccountCard = {
    accountId: string;
    influencerId: string;
    username: string;
    logoUrl: string;
    followers: number;
    socialMedia: string;
    countries?: Array<{ country: string; percentage: number; _id?: string }>;
    musicGenres?: string[];
    creatorCategories?: string[];
    categories?: string[];
    prices?: Partial<Record<AddAccountsCurrency, number>>;
};

export type FetchFiltersResponse = {
    statusCode: number;
    message: string;
    data: {
        filterArr: FilterBlock[];
    };
};

export type FetchSocialAccountsResponse = {
    statusCode: number;
    message: string;
    data: {
        accounts: SocialAccountCard[];
    };
};

export const getCurrencySymbol = (currency?: string) => {
    switch (String(currency ?? "").toUpperCase()) {
        case "EUR":
            return "€";
        case "USD":
            return "$";
        case "GBP":
            return "£";
        default:
            return String(currency ?? "");
    }
};
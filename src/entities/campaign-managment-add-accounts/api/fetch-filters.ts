
import type { FetchFiltersResponse } from "../model/add-accounts.types";
import {$api} from "@/app/api/http.ts";

export const fetchCampaignFilters = async () => {
    const { data } = await $api.get<FetchFiltersResponse>("/profile/filters");
    return data;
};
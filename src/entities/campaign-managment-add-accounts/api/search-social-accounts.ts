
import type { FetchSocialAccountsResponse } from "../model/add-accounts.types";
import {$api} from "@/app/api/http.ts";

export const searchSocialAccounts = async ({
                                               query,
                                               socialMedias,
                                               page,
                                               limit,
                                           }: {
    query: string;
    socialMedias: string[];
    page: number;
    limit: number;
}) => {
    const { data } = await $api.post<FetchSocialAccountsResponse>(
        "/profile/social-account/search",
        {
            query,
            socialMedias,
            page,
            limit,
        },
    );

    return data;
};
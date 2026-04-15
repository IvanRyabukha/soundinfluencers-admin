import {$api} from "@/app/api/http.ts";



type Params = {
    page: number;
    limit: number;
    sortBy: "bestMatch" | "lowestPrice" | "highestPrice" | "lowestFollowers" | "highestFollowers";
    body: any;
};

export const fetchFilteredSocialAccounts = async ({
                                                      page,
                                                      limit,
                                                      sortBy,
                                                      body,
                                                  }: Params) => {
    const { data } = await $api.post<any>(
        "/profile/social-account/filter",
        body,
        {
            params: { page, limit, sortBy },
        },
    );

    return data;
};
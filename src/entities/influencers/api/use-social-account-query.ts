import { useQuery } from "@tanstack/react-query";
import { getSocialAccountById } from "@/entities/influencers/api/influencers.api.ts";
import { influencerAccountsQueryKeys } from "@/entities/influencers/api/influencers.query-keys.ts";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

type TUseSocialAccountQueryParams = {
  influencerId?: string;
  accountId?: string;
  socialMedia?: TSocialMediaValue | null;
};

export const useSocialAccountQuery = ({
  influencerId,
  accountId,
  socialMedia,
}: TUseSocialAccountQueryParams) => {
  const params =
    influencerId && accountId && socialMedia ? { influencerId, accountId, socialMedia } : null;

  return useQuery({
    queryKey: params
      ? influencerAccountsQueryKeys.detail(params)
      : [...influencerAccountsQueryKeys.details(), "disabled"],

    queryFn: () => getSocialAccountById(params!),
    enabled: !!params,
    staleTime: 0,
  });
}

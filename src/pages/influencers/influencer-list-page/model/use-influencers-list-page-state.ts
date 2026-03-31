import { useEffect, useMemo, useState } from "react";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";

import { useDebounce } from "@/shared/hooks/use-debounce.ts";
import type { TGetInfluencerParams } from "@/entities/influencers/model/influencers.types.ts";
import { platformParser } from "@/entities/influencers/model/influencers.query-parsers.ts";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

export const useInfluencersListPageState = () => {
  const [limit, setLimitQuery] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10),
  );

  const [page, setPageQuery] = useQueryState(
    "page",
    parseAsInteger.withDefault(1),
  );

  const [platform, setPlatformQuery] = useQueryState(
    "platform",
    platformParser,
  );

  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault(""),
  );

  const [searchValue, setSearchValue] = useState(query);
  const debouncedSearchValue = useDebounce(searchValue, 400);

  useEffect(() => {
    const normalizedQuery = query.trim();
    const normalizedSearchValue = debouncedSearchValue.trim();

    if (normalizedSearchValue !== normalizedQuery) {
      void setQuery(normalizedSearchValue, { history: "replace" });

      if (page !== 1) {
        void setPageQuery(1, { history: "replace" });
      }
    }
  }, [debouncedSearchValue, query, page, setPageQuery, setQuery]);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  const handlePlatformChange = (nextPlatform: TSocialMediaValue | null) => {
    const resolvedPlatform = nextPlatform === platform ? null : nextPlatform;

    void setPlatformQuery(resolvedPlatform, { history: "replace" });

    if (page !== 1) {
      void setPageQuery(1, { history: "replace" });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handlePageChange = (nextPage: number) => {
    void setPageQuery(nextPage, { history: "replace" });
  };

  const handleLimitChange = (nextLimit: number) => {
    void setLimitQuery(nextLimit, { history: "replace" });

    if (page !== 1) {
      void setPageQuery(1, { history: "replace" });
    }
  };

  const queryParams: TGetInfluencerParams = useMemo(
    () => ({
      limit,
      page,
      ...(query.trim() ? { search: query.trim() } : {}),
      ...(platform ? { platform } : {}),
    }),
    [limit, page, query, platform],
  );

  return {
    page,
    limit,
    platform,
    query,
    searchValue,
    queryParams,

    handlePageChange,
    handleLimitChange,
    handlePlatformChange,
    handleSearchChange,
  };
};

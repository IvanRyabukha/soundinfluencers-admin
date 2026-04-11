import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/shared/hooks/use-debounce.ts";
import {
  parseAsString,
  useQueryState,
} from "nuqs";
import type { TGetInfluencerHistoryParams, TGetInfluencerSearchHistoryParams } from "@/entities/influencer-history/model/influencer-history.types.ts";

export const useInfluencersHistoryPageState = () => {
  const LIMIT = 10;

  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault(""),
  );

  const [searchValue, setSearchValue] = useState(query);
  const debouncedSearchValue = useDebounce(searchValue, 400);

  useEffect(() => {
    void setQuery(debouncedSearchValue.trim(), { history: "replace" });
  }, [debouncedSearchValue, setQuery]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const historyQueryParams: TGetInfluencerHistoryParams = useMemo(
    () => ({
      limit: LIMIT,
    }),
    [],
  );

  const searchQueryParams: TGetInfluencerSearchHistoryParams = useMemo(
    () => ({
      limit: LIMIT,
      search: query.trim(),
    }),
    [query],
  );

  return {
    query,
    searchValue,
    historyQueryParams,
    searchQueryParams,
    handleSearchChange,
  };
};

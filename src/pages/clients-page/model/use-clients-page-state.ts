import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks/use-debounce.ts";
import type { TGetClientsParams } from "@/entities/client/model/client.types.ts";

export const useClientsPageState = () => {
  const limit = 10;

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1),
  );

  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault(""),
  );

  const [searchValue, setSearchValue] = useState(query);
  const debouncedSearchValue = useDebounce(searchValue, 400);

  useEffect(() => {
    if (debouncedSearchValue !== query) {
      void setQuery(debouncedSearchValue || "", { history: "replace" });

      if (page !== 1) {
        void setPage(1, { history: "replace" });
      }
    }
  }, [
    debouncedSearchValue,
    query,
    page,
    setQuery,
    setPage,
  ]);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const queryParams: TGetClientsParams = query
    ? { limit, search: query }
    : { page, limit };

  return {
    page,
    limit,
    query,
    searchValue,
    queryParams,

    setPage,
    handleSearchChange,
  };
};


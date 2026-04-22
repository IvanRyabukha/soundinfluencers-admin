import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/shared/hooks/use-debounce.ts";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import type { TGetInfluencersInvoicesParams } from "@/entities/invoices/model/influencer-invoices.types.ts";

export const useInfluencerInvoicesPageState = () => {
  const LIMIT = 10;

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
    void setQuery(debouncedSearchValue.trim(), { history: "replace" });

    if (page !== 1) {
      void setPage(1, { history: "replace" });
    }

  }, [debouncedSearchValue, setQuery, page, setPage]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handlePageChange = (nextPage: number) => {
    void setPage(nextPage, { history: "replace" });
  };

  const influencerInvoiceQueryParams: TGetInfluencersInvoicesParams = useMemo(
    () => {
      const normalizedQuery = query.trim();

      return normalizedQuery
        ? { search: normalizedQuery }
        : { page, limit: LIMIT };
    },
    [query, page],
  );

  return {
    page,
    searchValue,
    influencerInvoiceQueryParams,

    handleSearchChange,
    handlePageChange,
  };
};

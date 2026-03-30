import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useClientsQuery } from "@/entities/client/api/use-clients-query.ts";
import { useDebounce } from "@/shared/hooks/use-debounce.ts";

import { PageBreadcrumbs } from "@/widgets/page-breadcrumbs";
import { PageTitle } from "@/widgets/page-title";
import { Search } from "@/features/search";
import { ClientsTable } from "@/widgets/clients/clients-table";
import type { TGetClientsParams } from "@/entities/client/model/client.types.ts";

import { notifyApiError } from "@/app/api/errors/notify.ts";

import styles from "./clients-page.module.scss";

export const ClientsPage = () => {
  const [query, setQuery] = useQueryState("query",
    parseAsString.withDefault(""),
  );

  const page = 1;
  const limit = 10;

  const [localValue, setLocalValue] = useState(query);
  const debounceValue = useDebounce(localValue, 400);

  useEffect(() => {
    const nextValue = debounceValue || "";

    if (nextValue !== query) {
      void setQuery(nextValue || null, { history: "replace" });
    }
  }, [debounceValue, query, setQuery]);

  useEffect(() => {
    setLocalValue(query);
  }, [query]);

  const queryParams: TGetClientsParams = query
    ? { limit, search: query }
    : { page, limit };

  const { data, isLoading, isFetching, isError, error } = useClientsQuery(queryParams);

  useEffect(() => {
    if (isError && error) {
      notifyApiError(error);
    }
  }, [isError, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading clients. Please try again later.</div>;
  }

  console.log('Client list data', data);

  return (
    <div className={styles.clientsPage}>
      <PageBreadcrumbs
        items={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Clients list" },
        ]}
      />

      <div className={styles.content}>
        <PageTitle title={'Clients list'} />

        <Search value={localValue} onSearchChange={setLocalValue}/>

        <ClientsTable data={data?.items ?? []} isFetching={isFetching} />
      </div>
    </div>
  );
};

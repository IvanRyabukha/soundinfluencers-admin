import { useEffect } from "react";
import { useClientsQuery } from "@/entities/client/api/use-clients-query.ts";
import { useClientsPageState } from "@/pages/clients-page/model/use-clients-page-state.ts";
import { SearchByQuery } from "@/features/search";

import { PageBreadcrumbs } from "@/widgets/page-breadcrumbs";
import { PageTitle } from "@/widgets/page-title";
import { ClientsTable } from "@/widgets/clients/clients-table";
import { Pagination } from "@/shared/ui";

import { notifyApiError } from "@/app/api/errors/notify.ts";

import styles from "./clients-page.module.scss";

export const ClientsPage = () => {
  const {
    page,
    searchValue,
    queryParams,
    handleSearchChange,
    setPage,
  } = useClientsPageState();

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

  const clients = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

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

        <SearchByQuery
          value={searchValue}
          onChange={handleSearchChange}
        />

        <ClientsTable data={clients} isFetching={isFetching} />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

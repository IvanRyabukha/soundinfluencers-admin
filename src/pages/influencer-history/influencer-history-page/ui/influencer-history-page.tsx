import { useEffect } from "react";
import { useInfluencerHistoryQuery } from "@/entities/influencer-history/api/use-influencer-history-query.ts";
import {
  useInfluencersHistoryPageState
} from "@/pages/influencer-history/influencer-history-page/model/use-influencer-history-page-state.ts";
import { PageBreadcrumbs } from "@/widgets/page-breadcrumbs";
import { PageTitle } from "@/widgets/page-title";
import { InfluencerSearch } from "@/widgets/influencer-history/influencer-search";
import { InfluencerHistoryTable } from "@/widgets/influencer-history/influencer-history-table";
import { notifyApiError } from "@/app/api/errors/notify.ts";

import s from './influencer-history-page.module.scss';
import {
  useInfluencerSearchHistoryQuery
} from "@/entities/influencer-history/api/use-influencer-search-history-query.ts";

export const InfluencerHistoryPage = () => {
  const { searchValue, handleSearchChange, historyQueryParams, searchQueryParams } = useInfluencersHistoryPageState();
  const { data: historyData, isLoading, isFetching, isError, error } = useInfluencerHistoryQuery(historyQueryParams);

  const { data: influencersData, isPending } = useInfluencerSearchHistoryQuery(searchQueryParams);

  useEffect(() => {
    if (isError && error) {
      notifyApiError(error);
    }
  }, [isError, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading Influencers history. Please try again later.</div>;
  }

  const history = historyData ?? [];

  const influencersList = influencersData?.items ?? [];

  return (
    <div className={s.influencersHistoryPage}>
      <PageBreadcrumbs
        items={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Influencer history" },
        ]}
      />

      <div className={s.content}>
        <PageTitle title="Influencer history"/>

        <div className={s.tableWrapper}>

          <InfluencerSearch
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            data={influencersList}
            isDisabled={isPending}
          />

          <InfluencerHistoryTable
            data={history}
            isFetching={isFetching}
          />
        </div>

      </div>
    </div>
  );
};

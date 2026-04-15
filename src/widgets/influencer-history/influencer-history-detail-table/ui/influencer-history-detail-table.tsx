import React, { useMemo } from "react";
import { Table } from "@/shared/ui";
import type { TInfluencerHistoryAction } from "@/entities/influencer-history/model/influencer-history-detail.types.ts";
import {
  INFLUENCER_HISTORY_DETAILS_COLUMNS
} from "@/widgets/influencer-history/influencer-history-detail-table/model/columns.tsx";
import {
  mapInfluencerHistoryActionsToTableRows
} from "@/widgets/influencer-history/influencer-history-detail-table/model/influencer-history-details-table.mapper.ts";

interface InfluencerHistoryDetailTableProps {
  data: TInfluencerHistoryAction[];
  isFetching: boolean;
}

export const InfluencerHistoryDetailTable: React.FC<InfluencerHistoryDetailTableProps> = ({
  data,
  isFetching,
}) => {

  const normalizeData = useMemo(() => mapInfluencerHistoryActionsToTableRows(data), [data]);

  return (
    <Table
      data={normalizeData}
      columns={INFLUENCER_HISTORY_DETAILS_COLUMNS}
      isFetching={isFetching}
      isManualPagination={true}
      emptyText={"No influencer history found"}
    />
  );
};

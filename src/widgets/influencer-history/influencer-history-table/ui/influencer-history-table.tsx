import React from "react";
import { Table } from "@/shared/ui";
import { INFLUENCER_HISTORY_COLUMNS } from "@/widgets/influencer-history/influencer-history-table/model/columns.tsx";
import type { IInfluencerHistory } from "@/entities/influencer-history/model/influencer-history.types.ts";

interface InfluencerHistoryTableProps {
  data: IInfluencerHistory[];
  isFetching: boolean;
}

export const InfluencerHistoryTable: React.FC<InfluencerHistoryTableProps> = ({
  data,
  isFetching,
}) => {

  return (
    <Table
      data={data}
      columns={INFLUENCER_HISTORY_COLUMNS}
      isFetching={isFetching}
      emptyText={"No influencers history found"}
      minWidth={732}
      tableLayout={'auto'}
    />
  );
};

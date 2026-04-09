import React, { useMemo } from "react";
import { Table } from "@/shared/ui";
import { getInfluencersColumns } from "@/widgets/influencers/influencers-table/model/columns.tsx";
import type { IInfluencer } from "@/entities/influencers/model/influencers.types.ts";
import type { TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";

interface InfluencersTableProps {
  data: IInfluencer[];
  isFetching?: boolean;
  platform: TSocialMediaValue | null;
}

export const InfluencersTable: React.FC<InfluencersTableProps> = ({ data, isFetching, platform }) => {
  console.log("InfluencersTable data:", data);

  const columns = useMemo(
    () => getInfluencersColumns(platform),
    [platform],
  );

  return (
    <Table
      data={data}
      columns={columns}
      isFetching={isFetching}
      isManualPagination={true}
      emptyText={"No influencers found"}
    />
  );
};

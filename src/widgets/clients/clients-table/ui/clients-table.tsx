import React from "react";
import { CLIENTS_COLUMN } from "@/widgets/clients/clients-table/model/columns.tsx";
import type { IClient } from "@/entities/client/model/client.types.ts";

import { Table } from "@/shared/ui";

interface ClientsTableProps {
  data: IClient[];
  isLoading?: boolean;
  isFetching?: boolean;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({
  data,
  isFetching,
  isLoading,
}) => {

  console.log("ClientsTable", data);

  return (
    <Table
      data={data}
      columns={CLIENTS_COLUMN}
      isFetching={isFetching}
      isLoading={isLoading}
      isManualPagination={true}
      emptyText={"No clients found"}
    />
  );
};

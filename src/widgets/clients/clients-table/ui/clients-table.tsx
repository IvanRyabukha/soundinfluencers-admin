import React from "react";
import { CLIENTS_COLUMN } from "@/widgets/clients/clients-table/model/columns.tsx";
import type { IClient } from "@/entities/client/model/client.types.ts";

import { Table } from "@/shared/ui";

interface ClientsTableProps {
  data: IClient[];
  isFetching?: boolean;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({ data, isFetching}) => {

  console.log("ClientsTable", data);

  return (
    <Table
      data={data}
      columns={CLIENTS_COLUMN}
      isFetching={isFetching}
      emptyText={"No clients found"}
    />
  );
};

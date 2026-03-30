import { Link } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import type { IClient } from "@/entities/client/model/client.types.ts";

import clsx from "clsx";

import styles from './columns.module.scss';

export const CLIENTS_COLUMN: ColumnDef<IClient>[] = [
  {
    header: "Company",
    accessorKey: "company",
    cell: ({ row } ) => (
      <Link to={`/dashboard/clients/${row.original.clientId}`} className={clsx(styles.cell)}>
        {row.original.company}
      </Link>
    ),
  },

  {
    header: "Name",
    accessorKey: "name",
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    header: "Email",
    accessorKey: "email",
    cell: (info ) => (
      <div className={clsx(styles.cell, styles.emailCell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    header: "Company type",
    accessorKey: "companyType",
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    header: "Proposal Access",
    accessorKey: "proposalAccess",
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<boolean>() ? 'Enabled' : 'Disabled'}
      </div>
    ),
  },

  {
    header: "Campaigns completed",
    accessorKey: "campaignsCompleted",
    cell: (info ) => (
      <div className={clsx(styles.cell, styles.numberCell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    header: "Campaigns active",
    accessorKey: "campaignsActive",
    cell: (info ) => (
      <div className={clsx(styles.cell, styles.numberCell)}>
        {info.getValue<string>()}
      </div>
    ),
  },
];

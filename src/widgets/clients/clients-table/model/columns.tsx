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
    size: 110,
    minSize: 110,
    maxSize: 110,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>() ?? '—'}
      </div>
    ),
  },

  {
    header: "Email",
    accessorKey: "email",
    cell: (info ) => (
      <div className={clsx(styles.cell, styles.emailCell)}>
        {info.getValue<string>() ?? '—'}
      </div>
    ),
  },

  {
    header: "Company type",
    accessorKey: "companyType",
    size: 100,
    minSize: 100,
    maxSize: 100,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>() ?? '—'}
      </div>
    ),
  },

  {
    header: "Proposal Access",
    accessorKey: "proposalAccess",
    size: 100,
    minSize: 100,
    maxSize: 100,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<boolean>() ? 'Enabled' : 'Disabled'}
      </div>
    ),
  },

  {
    header: "Campaigns completed",
    accessorKey: "campaignsCompleted",
    size: 75,
    minSize: 75,
    maxSize: 75,
    cell: (info ) => (
      <div className={clsx(styles.cell, styles.numberCell)}>
        {info.getValue<string>() ?? '—'}
      </div>
    ),
  },

  {
    header: "Campaigns active",
    accessorKey: "campaignsActive",
    size: 65,
    minSize: 65,
    maxSize: 65,
    cell: (info ) => (
      <div className={clsx(styles.cell, styles.numberCell)}>
        {info.getValue<string>() ?? '—'}
      </div>
    ),
  },
];

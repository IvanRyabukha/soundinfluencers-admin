import type { ColumnDef } from "@tanstack/react-table";
import type { ICampaign } from "@/entities/campaign/model/campaign.types.ts";
import { CampaignNameCell } from "@/entities/campaign/ui/campaign-name-cell/campaign-name-cell.tsx";
import clsx from "clsx";

import styles from './columns.module.scss';
import { CampaignActionsCell } from "@/entities/campaign/ui/campaign-actions-cell/campaign-actions-cell.tsx";

export const paymentsCampaignColumns: ColumnDef<ICampaign>[] = [
  {
    id: "campaign",
    header: "Campaign",
    size: 140,
    minSize: 140,
    maxSize: 140,
    cell: ({ row }) => (
      <CampaignNameCell
        campaignName={row.original.campaignName}
        socialMedia={row.original.socialMedia}
      />
    ),
  },

  {
    id: 'actions',
    header: 'Actions',
    size: 105,
    minSize: 105,
    maxSize: 105,
    cell: () => (
      <CampaignActionsCell />
    ),
  },

  {
    accessorKey: 'creatorRole',
    header: "Client",
    size: 88,
    minSize: 88,
    maxSize: 88,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    accessorKey: "followers",
    header: "Followers",
    size: 70,
    minSize: 70,
    maxSize: 70,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    accessorKey: "cost",
    header: "Cost",
    size: 75,
    minSize: 75,
    maxSize: 75,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>() + '\u20AC'}
      </div>
    ),
  },

  {
    accessorKey: "salePrice",
    header: "Sale Price",
    size: 75,
    minSize: 75,
    maxSize: 75,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>() + '\u20AC'}
      </div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Date",
    size: 87,
    minSize: 87,
    maxSize: 87,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    accessorKey: "statusLabel",
    header: "Status",
    size: 144,
    minSize: 144,
    maxSize: 144,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    id: "reportSent",
    header: "Report Sent",
    size: 108,
    minSize: 108,
    maxSize: 108,
  },

  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    size: 106,
    minSize: 106,
    maxSize: 106,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    accessorKey: "invoiceId",
    header: "Invoice Link",
    size: 71,
    minSize: 71,
    maxSize: 71,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    accessorKey: 'shortInvoiceId',
    header: "Inv. #",
    size: 82,
    minSize: 82,
    maxSize: 82,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    accessorKey: "notes",
    header: "Notes",
    size: 74,
    minSize: 74,
    maxSize: 74,
    cell: (info ) => (
      <div
        className={clsx(styles.cell, styles.notesCell)}
        title={info.getValue<string>()}
        // onMouseEnter={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   console.log('Show full notes:', info.getValue<string>());
        // }}
      >
        {info.getValue<string>().length > 5 ? info.getValue<string>().slice(0, 5) + '...' : info.getValue<string>()}
      </div>
    ),
  },
];

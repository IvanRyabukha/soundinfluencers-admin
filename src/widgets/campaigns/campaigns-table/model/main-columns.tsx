import type { ColumnDef } from "@tanstack/react-table";
import type { ICampaign } from "@/entities/campaign/model/campaign.types.ts";
import clsx from "clsx";
import { CampaignNameCell } from "@/entities/campaign/ui/campaign-name-cell/campaign-name-cell.tsx";

import styles from "./columns.module.scss";

export const mainCampaignColumns: ColumnDef<ICampaign>[] = [
  {
    id: "campaign",
    header: "Campaign",
    size: 250,
    minSize: 250,
    maxSize: 250,
    cell: ({ row }) => (
      <CampaignNameCell
        campaignName={row.original.campaignName}
        socialMedia={row.original.socialMedia}
      />
    ),
  },

  {
    accessorKey: "affiliatePartner",
    header: "Affiliate Partner",
    size: 180,
    minSize: 180,
    maxSize: 180,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    accessorKey: "cost",
    header: "Cost",
    size: 85,
    minSize: 85,
    maxSize: 85,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>() + '\u20AC'}
      </div>
    ),
  },

  {
    accessorKey: "salePrice",
    header: "Sale Price",
    size: 85,
    minSize: 85,
    maxSize: 85,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>() + '\u20AC'}
      </div>
    ),
  },

  {
    accessorKey: "statusLabel",
    header: "Payment Status",
    size: 165,
    minSize: 165,
    maxSize: 165,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    accessorKey: "affiliateCommission",
    header: "Affiliate Commission",
    size: 150,
    minSize: 150,
    maxSize: 150,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    accessorKey: "affiliatePaid",
    header: "Affiliate Paid",
    size: 108,
    minSize: 108,
    maxSize: 108,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>() + '\u20AC'}
      </div>
    ),
  },

  {
    accessorKey: "paymentStatus",
    header: "Affiliate Status",
    size: 108,
    minSize: 108,
    maxSize: 108,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>()}
      </div>
    ),
  },

  {
    accessorKey: "notes",
    header: "Notes",
    size: 95,
    minSize: 95,
    maxSize: 95,
    cell: (info ) => (
      <div className={clsx(styles.cell)}>
        {info.getValue<string>()}
      </div>
    ),
  },
];


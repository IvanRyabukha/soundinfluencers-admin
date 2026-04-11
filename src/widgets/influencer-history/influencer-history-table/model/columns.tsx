import type { ColumnDef } from "@tanstack/react-table";
import type { IInfluencerHistory } from "@/entities/influencer-history/model/influencer-history.types.ts";
import {
  InfluencerHistoryTableName
} from "@/widgets/influencer-history/influencer-history-table/ui/influencer-history-table-name";
import {
  InfluencerHistoryTableAccountCell
} from "@/widgets/influencer-history/influencer-history-table/ui/influencer-history-table-account";
import {
  InfluencerHistoryTextCell
} from "@/widgets/influencer-history/influencer-history-table/ui/influencer-history-text-cell";

import s from './columns.module.scss';

export const INFLUENCER_HISTORY_COLUMNS: ColumnDef<IInfluencerHistory>[] = [
  {
    header: "Name",
    accessorKey: "influencerName",
    size: 146,
    minSize: 74,
    maxSize: 146,
    cell: ({ row }) => (
      <InfluencerHistoryTableName
        influencerId={row.original.influencerId}
        value={row.original.influencerName}
        className={s.cell}
      />
    ),
  },
  {
    header: "Account username",
    accessorKey: "username",
    size: 233,
    minSize: 158,
    maxSize: 233,
    cell: ({ row }) => (
      <InfluencerHistoryTableAccountCell
        username={row.original.username}
        socialMedia={row.original.socialMedia}
        className={s.cell}
      />
    ),
  },
  {
    header: "Campaign name",
    accessorKey: "campaignName",
    size: 385,
    minSize: 258,
    maxSize: 385,
    cell: ({ row }) => (
      <InfluencerHistoryTextCell
        value={row.original.campaignName}
        className={s.cell}
      />
    ),
  },
  {
    header: "Last update",
    accessorKey: "statusLabel",
    size: 450,
    minSize: 242,
    maxSize: 450,
    cell: ({ row }) => (
      <InfluencerHistoryTextCell
        value={row.original.statusLabel}
        className={s.cell}
      />
    ),
  },
];



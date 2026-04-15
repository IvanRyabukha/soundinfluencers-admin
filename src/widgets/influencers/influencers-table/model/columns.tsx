

import type { ColumnDef } from "@tanstack/react-table";
import { InfluencersNetworksCell } from "@/widgets/influencers/influencers-table/ui/influencers-networks-cell";
import { InfluencersTextCell } from "@/widgets/influencers/influencers-table/ui/influencers-text-cell";
import { InfluencersFollowersCell } from "@/widgets/influencers/influencers-table/ui/influencers-followers-cell";
import { InfluencersLinkCell } from "@/widgets/influencers/influencers-table/ui/influencers-link-cell";
import { InfluencersNumberCell } from "@/widgets/influencers/influencers-table/ui/influencers-number-cell";
import { InfluencersNotesCell } from "@/widgets/influencers/influencers-table/ui/influencers-notes-cell";
import { EditableInfluencersNumberCell } from "@/widgets/influencers/influencers-table/ui/editable-influencers-number-cell";

import { SOCIAL_MEDIA_LABEL_MAP, type TSocialMediaValue } from "@/entities/influencers/model/influencers.constants.ts";
import type { TInfluencersListRow } from "@/entities/influencers/model/influencers-list.types.ts";

import s from "./columns.module.scss";

export const getInfluencersColumns = (
  selectedPlatform: TSocialMediaValue | null,
): ColumnDef<TInfluencersListRow>[] => [
  {
    id: "networks",
    header: "Networks",
    size: 250,
    minSize: 250,
    maxSize: 250,
    cell: ({ row }) => (
      <InfluencersNetworksCell
        influencerId={row.original.influencerId}
        accountId={row.original.accountId}
        socialMedia={row.original.socialMedia}
        username={row.original.username}
        isHidden={row.original.isHidden}
        logoUrl={row.original.logoUrl}
        className={s.cell}
      />
    ),
  },

  {
    accessorKey: "firstName",
    header: "First name",
    size: 90,
    minSize: 90,
    maxSize: 90,
    cell: ({ row }) => (
      <InfluencersTextCell
        value={row.original.firstName}
        className={s.cell}
      />
    ),
  },

  {
    accessorKey: "lastName",
    header: "Last name",
    size: 90,
    minSize: 90,
    maxSize: 90,
    cell: ({ row }) => (
      <InfluencersTextCell
        value={row.original.lastName}
        className={s.cell}
      />
    ),
  },

  {
    accessorKey: "email",
    header: "Email",
    size: 95,
    minSize: 95,
    maxSize: 95,
    cell: ({ row }) => (
      <InfluencersTextCell
        value={row.original.email}
        className={s.cell}
      />
    ),
  },

  {
    accessorKey: "phone",
    header: "Phone",
    size: 90,
    minSize: 90,
    maxSize: 90,
    cell: ({ row }) => (
      <InfluencersTextCell
        value={row.original.phone}
        className={s.cell}
      />
    ),
  },

  {
    accessorKey: "followers",
    header: "Followers",
    size: 70,
    minSize: 70,
    maxSize: 70,
    cell: ({ row }) => (
      <InfluencersFollowersCell
        followers={row.original.followers}
        className={s.cell}
      />
    ),
  },

  {
    accessorKey: "profileLink",
    header: selectedPlatform
      ? `${SOCIAL_MEDIA_LABEL_MAP[selectedPlatform]} link`
      : "Account link",
    size: 130,
    minSize: 130,
    maxSize: 130,
    cell: ({ row }) => (
      <InfluencersLinkCell
        influencerId={row.original.influencerId}
        accountId={row.original.accountId}
        socialMedia={row.original.socialMedia}
        profileLink={row.original.profileLink}
        platformLabel={SOCIAL_MEDIA_LABEL_MAP[row.original.socialMedia]}
        className={s.cell}
      />
    ),
  },

  {
    accessorKey: "price",
    header: "Sale Price (€)",
    size: 60,
    minSize: 60,
    maxSize: 60,
    cell: ({ row }) => (
      <EditableInfluencersNumberCell
        mode={"socialAccount"}
        influencerId={row.original.influencerId}
        accountId={row.original.accountId}
        socialMedia={row.original.socialMedia}
        value={row.original.price}
        className={s.cell}
        field={"price"}
      />
    ),
  },

  {
    accessorKey: "publicPrice",
    header: "Cost (€)",
    size: 60,
    minSize: 60,
    maxSize: 60,
    cell: ({ row }) => (
      <EditableInfluencersNumberCell
        mode={"socialAccount"}
        influencerId={row.original.influencerId}
        accountId={row.original.accountId}
        socialMedia={row.original.socialMedia}
        value={row.original.publicPrice}
        className={s.cell}
        field={"publicPrice"}
      />
    ),
  },

  {
    accessorKey: "initialPrice",
    header: "Cost (Local)",
    size: 70,
    minSize: 70,
    maxSize: 70,
    cell: ({ row }) => (
      <InfluencersNumberCell
        value={row.original.initialPrice}
        suffix={row.original.currency}
        className={s.cell}
      />
    ),
  },

  {
    accessorKey: "costPerFollower",
    header: "Cost per Follower",
    size: 80,
    minSize: 80,
    maxSize: 80,
    cell: ({ row }) => (
      <InfluencersNumberCell
        value={row.original.costPerFollower}
        className={s.cell}
      />
    ),
  },

  {
    accessorKey: "balance",
    header: "Balance (€)",
    size: 60,
    minSize: 60,
    maxSize: 60,
    cell: ({ row }) => (
      <EditableInfluencersNumberCell
        mode={"influencer"}
        influencerId={row.original.influencerId}
        accountId={row.original.accountId}
        value={row.original.balance}
        className={s.cell}
        field={"balance"}
      />
    ),
  },

  {
    accessorKey: "internalNote",
    header: "Notes",
    size: 50,
    minSize: 50,
    maxSize: 50,
    cell: ({ row }) => (
      <InfluencersNotesCell
        influencerId={row.original.influencerId}
        accountId={row.original.accountId}
        value={row.original.internalNote}
        className={s.cell}
      />
    ),
  },
];

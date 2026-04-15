//@ts-nocheck


import type { ColumnDef } from "@tanstack/react-table";
import type { TableGroup } from "@/entities/campaign-managment/model/campaign.managment.ts";
import type { CampaignManagementRow } from "@/widgets/campaign-management/campaign-management-table/model/campaign-management-table.types.ts";
import styles from "./arrow.module.scss";
import up from '../assets/Vector.svg'
import down from '../assets/chevron-down.svg'
import {
    type CampaignManagementColumnKey, getColumns, getTableColumnWidths, getTitle
} from "@/widgets/campaign-management/campaign-management-table/model/campaign-management-table.data.ts";
import {
    NetworkTableCell
} from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/network-table-cell.tsx";
import {
    FollowersTableCell
} from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/followers-table-cell.tsx";
import {
    DateTableCell
} from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/date-table-cell.tsx";
import {
    ContentTableCell
} from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/content-table-cell.tsx";
import {
    DescriptionTableCell
} from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/description-table-cell.tsx";
import {
    ExtraFieldsTableCell
} from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/extra-fields-table-cell.tsx";
import {
    GenresTableCell
} from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/genres-table-cell.tsx";
import {
    CountriesTableCell
} from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/countries-table-cell.tsx";
import './table-base.scss'
import {
    ActionCell
} from "@/widgets/campaign-management/campaign-management-table/ui/wrapper-cells/cells/action-cell.tsx";


type Params = {
    group: TableGroup;
    changeView: boolean;
    canEdit: boolean;
};

const createColumn = (
    key: CampaignManagementColumnKey,
    group: TableGroup,
    width?: number,
    cell?: ColumnDef<CampaignManagementRow>["cell"],
    extra?: Partial<ColumnDef<CampaignManagementRow>>,
): ColumnDef<CampaignManagementRow> => ({
    id: key,
    header: getTitle(group, key),
    size: width,
    minSize: width,
    maxSize: width,
    cell,
    ...extra,
});
const renderSortableHeader = (title: string, column: any) => {
    const sort = column.getIsSorted();

    return (
        <button
            type="button"
            onClick={column.getToggleSortingHandler()}
            className={`${styles.sortHeader} ${sort ? styles.sortHeaderActive : ""}`}
        >
            <span className={styles.sortTitle}>{title}</span>

            <span className={styles.sortIcons}>
        <img
            src={up}
            alt=""
            className={`${styles.sortImage} ${sort === "asc" ? styles.sortImageActive : ""}`}
        />
        <img
            src={down}
            alt=""
            className={`${styles.sortImage} ${sort === "desc" ? styles.sortImageActive : ""}`}
        />
      </span>
        </button>
    );
};
export const getCampaignManagementColumns = ({
                                                 group,
                                                 changeView,
                                                 canEdit,
                                             }: Params): ColumnDef<CampaignManagementRow>[] => {
    const keys = getColumns(changeView, group, canEdit);
    const widths = getTableColumnWidths({ group, changeView, canEdit });

    const columnMap: Record<
        CampaignManagementColumnKey,
        ColumnDef<CampaignManagementRow>
    > = {
        network: createColumn("network", group, widths.network, ({ row }) => (
            <NetworkTableCell row={row.original} />
        )),

        followers: createColumn(
            "followers",
            group,
            widths.followers,
            ({ row }) => <FollowersTableCell row={row.original} />,
            {
                accessorFn: (row) => Number(row.account?.followers ?? 0),
                enableSorting: true,
                header: ({ column }) => renderSortableHeader(getTitle(group, "followers"), column),
            },
        ),

        date: createColumn("date", group, widths.date, ({ row }) => (
            <DateTableCell row={row.original} canEdit={canEdit} />
        )),

        content: createColumn("content", group, widths.content, ({ row }) => (
            <ContentTableCell row={row.original} canEdit={canEdit} />
        )),

        description: createColumn("description", group, widths.description, ({ row }) => (
            <DescriptionTableCell row={row.original} canEdit={canEdit} />
        )),

        tag: createColumn("tag", group, widths.tag, ({ row }) => (
            <ExtraFieldsTableCell row={row.original} field="tag" canEdit={canEdit} />
        )),

        link: createColumn("link", group, widths.link, ({ row }) => (
            <ExtraFieldsTableCell row={row.original} field="link" canEdit={canEdit} />
        )),

        brief: createColumn("brief", group, widths.brief, ({ row }) => (
            <ExtraFieldsTableCell row={row.original} field="brief" canEdit={canEdit} />
        )),

        tracktitle: createColumn("tracktitle", group, widths.tracktitle, ({ row }) => (
            <DescriptionTableCell row={row.original} field="tracktitle" canEdit={canEdit} />
        )),

        pressLink: createColumn("pressLink", group, widths.pressLink, ({ row }) => (
            <ExtraFieldsTableCell row={row.original} field="pressLink" canEdit={canEdit} />
        )),

        artworkLink: createColumn("artworkLink", group, widths.artworkLink, ({ row }) => (
            <DescriptionTableCell row={row.original} field="artworkLink" canEdit={canEdit} />
        )),

        genres: createColumn("genres", group, widths.genres, ({ row }) => (
            <GenresTableCell row={row.original} />
        )),

        countries: createColumn("countries", group, widths.countries, ({ row }) => (
            <CountriesTableCell row={row.original} />
        )),
        action: createColumn("action", group, widths.action, ({ row }) => (
            <ActionCell data={row.original.account} />
        )),
    };

    return keys.map((key) => columnMap[key]);
};
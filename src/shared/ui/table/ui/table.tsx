import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import styles from './table.module.scss';

interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isManualPagination?: boolean;
  isFetching?: boolean;
  emptyText?: string;
}

export function Table<TData>({
  data,
  columns,
  isManualPagination = false,
  isFetching = false,
  emptyText = "No data available",
}: TableProps<TData>) {
  "use no memo";

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: isManualPagination,
  });

  const rows = table.getRowModel().rows;

  return (
    <div className={styles.tableWrapper}>

      <div className={styles.scrollWrapper}>

        <div className={styles.tableInner}>
          {isFetching && rows.length > 0 && (
            <div className={styles.overlay}></div>
          )}

          <table className={styles.table}>
            <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={styles.th}
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    <div className={styles.headCell}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
            </thead>

            <tbody className={styles.tbody}>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.stateCell}>
                  {isFetching ? "Loading..." : emptyText}
                </td>
              </tr>
            ) : (
              rows.map((row, index, array) => {
                const isFirst = index === 0;
                const isLast = index === array.length - 1;

                return (
                  <tr key={row.id} className={styles.tr}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={styles.td}
                        style={{
                          width: cell.column.getSize(),
                          paddingTop: isFirst ? 16 : undefined,
                          paddingBottom: isLast ? 16 : undefined,
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
            </tbody>
          </table>

          <div className={styles.footer}/>

        </div>

      </div>

    </div>
  );
}

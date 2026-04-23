import type { ColumnDef } from "@tanstack/react-table";
import { BaseTableCell } from "@/shared/ui";
import { DownloadInvoicePdf } from "@/features/download-invoice-pdf/download-invoice-pdf.tsx";
import { OpenClientInvoiceButton } from "@/features/clients-invoices";
import { formatCurrency } from "@/shared/libs/format/format-currency.ts";
import type { IClientInvoiceTableRowDto } from "@/entities/invoices/model/clients-invoices.types.ts";

import s from './clients-invoices-table.module.scss';

export const CLIENTS_INVOICES_COLUMNS: ColumnDef<IClientInvoiceTableRowDto>[] = [
  {
    header: "Invoice ID",
    accessorKey: "invoiceId",
    size: 233,
    minSize: 70,
    maxSize: 233,
    cell: ({ row }) => (
      <BaseTableCell>
       <span
         className={s.text}
         title={row.original.invoiceId}
       >
         {row.original.invoiceId}
       </span>
      </BaseTableCell>
    ),
  },
  {
    header: "Company",
    accessorKey: "company",
    size: 110,
    minSize: 110,
    maxSize: 110,
    cell: ({ row }) => (
      <BaseTableCell>
       <span
         className={s.text}
         title={row.original.company}
       >
         {row.original.company}
       </span>
      </BaseTableCell>
    ),
  },
  {
    header: "Campaign name",
    accessorKey: "campaignName",
    size: 306,
    minSize: 203,
    maxSize: 306,
    cell: ({ row }) => (
      <BaseTableCell>
       <span
        className={s.text}
        title={row.original.campaignName}
       >
         {row.original.campaignName}
       </span>
      </BaseTableCell>
    ),
  },
  {
    header: "Date",
    accessorKey: "date",
    size: 105,
    minSize: 74,
    maxSize: 105,
    cell: ({ row }) => (
      <BaseTableCell>
        {row.original.date}
      </BaseTableCell>
    ),
  },
  {
    header: "Amount",
    accessorKey: "amount",
    size: 115,
    minSize: 66,
    maxSize: 115,
    cell: ({ row }) => (
      <BaseTableCell>
        {row.original.amount ? formatCurrency(row.original.amount, "EUR") : "—"}
      </BaseTableCell>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    size: 120,
    minSize: 113,
    maxSize: 120,
    cell: ({ row }) => (
      <BaseTableCell className={s.cell}>
        <OpenClientInvoiceButton
          invoiceId={row.original.invoiceId}
          invoiceRow={row.original}
        />
        <DownloadInvoicePdf invoiceId={row.original.invoiceId}/>
      </BaseTableCell>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    size: 204,
    minSize: 106,
    maxSize: 204,
    cell: ({ row }) => (
      <BaseTableCell>
        {row.original.status}
      </BaseTableCell>
    ),
  },
];
